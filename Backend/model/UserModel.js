import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;

