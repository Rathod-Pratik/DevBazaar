 import User from "../model/UserModel.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

export async function UpdateProfile(req, res) {
  try {
    const {address , Oldpassword, NewPassword, user,email } = req.body;

    // Check if required fields are present
    if (!Oldpassword || !NewPassword || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user in the database
    const userName = await User.findOne({ email });
    if (!userName) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate old password
    const isMatch = await bcrypt.compare(Oldpassword, userName.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(NewPassword, 10);

    const updateFields = { password: hashedPassword }; // Always update password
    if (address && address.length > 0) {
      updateFields.address = address; // Add address only if provided
    }
    
    const updateData = await User.updateOne(
      { email: email },
      { $set: updateFields }
    );
    

    // Check if the update was successful
    if (updateData.modifiedCount > 0) {
      // Create JWT token
      const tokenPayload = { id: userName.id }; // Minimal payload for security
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

      const data = await User.findOne({ email });

      res.status(200).json({user:data, message: "Profile updated successfully" });
    } else {
      res.status(400).json({ message: "Profile update failed" });
    }
  } catch (error) {
    console.error("Error during profile update:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
