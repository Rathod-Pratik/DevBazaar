import User from "../Auth/Auth.Model.js";
import { profileUpdateSchema, validate } from "./Profile.Validation.js";

export async function GetProfile(req, res) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findOne({ _id: userId, isDelete: { $ne: true } }).select("-password -otp");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error("Error during profile fetch:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function UpdateProfile(req, res) {
    const validated = validate(profileUpdateSchema, req.body);
    if (!validated.success) {
        return res.status(400).json({ message: validated.message });
    }

    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const currentUser = await User.findOne({ _id: userId, isDelete: { $ne: true } });
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const {
            name,
            mobile,
            mobileNumber,
            image,
            fullAddress,
            landmark,
            city,
            state,
            country,
            pincode,
            type,
            address,
        } = validated.data;

        const updateFields = {};

        if (name !== undefined) updateFields.name = name;
        if (mobile !== undefined) updateFields.mobile = mobile;
        if (mobileNumber !== undefined) updateFields.mobile = mobileNumber;
        if (image !== undefined) updateFields.image = image;

        const addressUpdate = {
            ...(currentUser.address || {}),
            ...(address || {}),
        };

        if (fullAddress !== undefined) addressUpdate.fullAddress = fullAddress;
        if (landmark !== undefined) addressUpdate.landmark = landmark;
        if (city !== undefined) addressUpdate.city = city;
        if (state !== undefined) addressUpdate.state = state;
        if (country !== undefined) addressUpdate.country = country;
        if (pincode !== undefined) addressUpdate.pincode = pincode;
        if (type !== undefined) addressUpdate.type = type;

        if (Object.keys(addressUpdate).length > 0) {
            updateFields.address = addressUpdate;
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No changes detected" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password -otp");

        return res.status(200).json({ user: updatedUser, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error during profile update:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
