import User from "../model/UserModel.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";

export async function UpdateProfile(req, res) {
  try {
    const { address, Oldpassword, NewPassword, email } = req.body;

    if (!Oldpassword || !NewPassword || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userName = await User.findOne({ email });
    if (!userName) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Oldpassword, userName.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const hashedPassword = await bcrypt.hash(NewPassword, 10);

    const updateFields = { password: hashedPassword };
    if (address && address.length > 0) {
      updateFields.address = address;
    }

    const { modifiedCount } = await User.updateOne(
      { email },
      { $set: updateFields }
    );

    if (modifiedCount > 0) {
      const tokenPayload = { id: userName.id };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      const data = await User.findOne({ email });
      const { password, ...safeUserData } = data._doc;

      res.status(200).json({ user: safeUserData, message: "Profile updated successfully" });
    } else {
      res.status(400).json({ message: "No changes detected or invalid update request" });
    }
  } catch (error) {
    console.error("Error during profile update:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
