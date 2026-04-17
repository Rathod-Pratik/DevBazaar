import User from "../model/UserModel.js";

export async function UpdateProfile(req, res) {
  try {
    const { mobileNumber, address, town, city, companyName, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const userName = await User.findOne({ email });
    if (!userName) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateFields = {};
    if (mobileNumber && mobileNumber.length > 0) {
      updateFields.mobileNumber = mobileNumber;
    }
    if (address !== undefined) {
      updateFields.address = address;
    }
    if (town !== undefined) {
      updateFields.town = town;
    }
    if (city !== undefined) {
      updateFields.city = city;
    }
    if (companyName !== undefined) {
      updateFields.companyName = companyName;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No changes detected" });
    }

    const { modifiedCount } = await User.updateOne(
      { email },
      { $set: updateFields }
    );

    if (modifiedCount > 0) {
      const data = await User.findOne({ email }).lean();
      const { password, ...safeUserData } = data;

      res.status(200).json({ user: safeUserData, message: "Profile updated successfully" });
    } else {
      res.status(400).json({ message: "No changes detected or invalid update request" });
    }
  } catch (error) {
    console.error("Error during profile update:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
