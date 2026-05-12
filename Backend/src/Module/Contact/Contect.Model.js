import mongoose from "mongoose";

const Contact = new mongoose.Schema({
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

const ContactModel = mongoose.model("Contact", Contact);

export default ContactModel;
