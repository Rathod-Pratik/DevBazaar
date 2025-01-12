const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");
const {validationResult}=require('express-validator');
//id  rathodpratik1928
//pass ACTPXa6iOFxkziHp

//Expire time for the token
const maxAge = 3 * 24 * 60 * 60;

//Write function to create token
// const CreateToken = (email, password) => {
//   return jwt.sign({ email, password }, process.env.JWT_SECRET, {
//     expiresIn: maxAge,
//   });
// };

//Write function to login
const signup = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  try {
    const { email, password,name } = req.body;

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
    const user = await User.create({FirstName:firstName,LastName:lastName, email: email, password: hashPassword });

    return res.status(201).send({user});
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

const Login = async (req, res) => {
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

    return res.status(200).json({user});
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { signup, Login };
