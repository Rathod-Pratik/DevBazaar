import User from "../Auth/Auth.Model.js";
import { userActionSchema, validate } from "./User.Validation.js";

export const GetUser = async (req, res) => {
  try {
    const users = await User.find({ role: "user", isDelete: { $ne: true } }).select("-password");
    if (!users.length) {
      return res.status(200).send("No user found");
    }
    return res.status(200).json({ users });
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
    const block = await User.findByIdAndUpdate(_id, { status: "active" }, { new: true });
    if (!block) {
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
    const block = await User.findByIdAndUpdate(_id, { status: "blocked" }, { new: true });
    if (!block) {
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
    const deletedUser = await User.findByIdAndUpdate(_id, { $set: { isDelete: true } }, { new: true });
    if (!deletedUser) {
      return res.status(404).send("User is not found");
    }
    return res.status(200).send("User Deleted successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
};
