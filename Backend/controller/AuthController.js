import User from "../model/UserModel.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Write function to login
export const signup = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  try {
    const { email, password, name } = req.body;

    //Check if email and password are provided
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    //Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const solt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, solt);
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");
    const user = await User.create({
      FirstName: firstName,
      LastName: lastName,
      email: email,
      password: hashPassword,
    });
    const tokenPayload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true only if using HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    };
    res.cookie("userToken", token, cookieOptions);
    return res.status(201).send({ user });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export const Login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({NotFound:true, error: "Invalid credentials" });
    }
    
    if(user.status==='blocked'){
      return res.status(400).json({blocked:true, error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({WrongPassword:true, error: "Invalid credentials" });
    }

    // Prepare token payload
    const tokenPayload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true only if using HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    };

    // Set cookie based on role
    if (user.role === "admin") {
      res.cookie("adminToken", token, cookieOptions);
      return res.status(200).json({ user, message: "Admin login successful" });
    }

    res.cookie("userToken", token, cookieOptions);
    return res.status(200).json({ user, message: "Login successful" });

  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetUser = async (req, res) => {
  try {
    const users = await User.find({role:'user'});
    if (users.length < 0) {
      return res.status(200).send("No user found");
    } else {
      return res.status(200).json({users});
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const UnblockUser = async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).send("_id is required");
  }

  try {
    const Block = await User.findByIdAndUpdate(
      _id,
      { status: "active" },
      { new: true }
    );
    if (!Block) {
      return res.status(404).send("User is not found");
    }
    return res.status(200).send("User Blocked successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
};
export const BlockUser = async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).send("_id is required");
  }

  try {
    const Block = await User.findByIdAndUpdate(
      _id,
      { status: "blocked" },
      { new: true }
    );
    if (!Block) {
      return res.status(404).send("User is not found");
    }
    return res.status(200).send("User Blocked successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const DeleteUser = async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).send("_id is required");
  }

  try {
    const Block = await User.findByIdAndDelete(_id);
    if (!Block) {
      return res.status(404).send("User is not found");
    }
    return res.status(200).send("User Deleted successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const Logout = (req, res) => {
  res.clearCookie("adminToken", { httpOnly: true, secure: true, sameSite: "None" });
  res.clearCookie("userToken", { httpOnly: true, secure: true, sameSite: "None" });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};