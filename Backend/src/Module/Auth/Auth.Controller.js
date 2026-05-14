import User from "./Auth.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginSchema, signupSchema, validate } from "./Auth.Validation.js";

export const signup = async (req, res) => {
  const validated = validate(signupSchema, req.body);
  if (!validated.success) {
    return res.status(400).json({ error: validated.message });
  }
  try {
    const { email, password, name } = validated.data;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ AlreadyExist: true, error: "User already exists" });
    }

    const solt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, solt);
    const user = await User.create({
      name,
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
    res.cookie("auth", token, cookieOptions);
    return res.status(201).send({ user });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export const Login = async (req, res) => {
  const validated = validate(loginSchema, req.body);
  if (!validated.success) {
    return res.status(400).json({ error: validated.message });
  }

  try {
    const { email, password } = validated.data;

    const user = await User.findOne({ email });
    if (!user || user.isDelete) {
      return res.status(400).json({ NotFound: true, error: "Invalid credentials" });
    }

    if (user.status === 'blocked') {
      return res.status(400).json({ blocked: true, error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ WrongPassword: true, error: "Invalid credentials" });
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
      res.cookie("auth", token, cookieOptions);
      return res.status(200).json({ user, message: "Admin login successful" });
    }

    res.cookie("auth", token, cookieOptions);
    return res.status(200).json({ user, message: "Login successful" });

  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetUser = async (req, res) => {
  try {
    const users = await User.find({ role: 'user', isDelete: { $ne: true } }).select("-password -otp");
    if (!users.length) {
      return res.status(200).send("No user found");
    } else {
      return res.status(200).json({ users });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const UnblockUser = async (req, res) => {
  const validated = validate(userActionSchema, req.params);
  if (!validated.success) {
    return res.status(400).send(validated.message);
  }

  const { _id } = validated.data;

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
  const validated = validate(userActionSchema, req.params);
  if (!validated.success) {
    return res.status(400).send(validated.message);
  }

  const { _id } = validated.data;

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
  const validated = validate(userActionSchema, req.params);
  if (!validated.success) {
    return res.status(400).send(validated.message);
  }

  const { _id } = validated.data;

  try {
    const deletedUser = await User.findByIdAndUpdate(
      _id,
      { $set: { isDelete: true } },
      { new: true }
    );
    if (!deletedUser) {
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
