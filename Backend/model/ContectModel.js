import mongoose from "mongoose";

const Contect = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userInfo: {
    type: Object,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContectModel = mongoose.model("Contect", Contect);
export default ContectModel;
