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

    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const tokenPayload = { id: user.id }; // Minimal payload for security
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d", // Matches cookie lifetime
    });

    // Set the token in a secure cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true, // Use HTTPS in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length < 0) {
      return res.status(200).send("No user found");
    } else {
      return res.status(200).json("users");
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const BlockUser = async (req, res) => {
  const { _id } = req.body;

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
