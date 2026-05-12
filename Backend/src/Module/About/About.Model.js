import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      required: true,
    },

    heroDescription: {
      type: String,
      required: true,
    },
    heroSubtitle: {
      type: String,
    },

    heroImage: {
      type: String,
    },

    stats: [
      {
        label: String,
        value: String,
      },
    ],

    features: [
      {
        title: String,
        description: String,
        icon: String,
      },
    ],

    teamMembers: [
      {
        name: String,
        role: String,
        image: String,
      },
    ],

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const AboutModel = mongoose.model(
  "About",
  aboutSchema
);


export default AboutModel;

