import AboutModel from "./About.Model.js";
import { heroUpdateSchema, statsUpdateSchema, teamMemberCreateSchema, teamMemberUpdateSchema, featureCreateSchema, featureUpdateSchema, idSchema } from "./About.validation.js";
import { uploadFileToS3, getSignedUrlS3 } from "../../Utils/Function.js";
import mongoose from "mongoose";

const parseAboutData = (body) => {
  const rawData = body?.data ?? body;

  if (typeof rawData === "string") {
    return JSON.parse(rawData);
  }

  return rawData;
};

export const GetAbout = async (req, res) => {
  try {
    const existing = await AboutModel.findOne({
      singletonKey: 'about-us',
    }).lean();

    let aboutData = existing || {};

    // Generate signed URLs for image fields if they exist
    if (aboutData.heroImage && aboutData.heroImage.includes('s3')) {
      aboutData.heroImageSignedUrl = await getSignedUrlS3(aboutData.heroImage);
    }

    // Signed URLs for team member images
    if (aboutData.teamMembers && Array.isArray(aboutData.teamMembers)) {
      aboutData.teamMembers = await Promise.all(
        aboutData.teamMembers.map(async (member) => {
          if (member.image && member.image.includes('s3')) {
            return {
              ...member,
              imageSignedUrl: await getSignedUrlS3(member.image)
            };
          }
          return member;
        })
      );
    }

    // Signed URLs for features
    if (aboutData.features && Array.isArray(aboutData.features)) {
      aboutData.features = await Promise.all(
        aboutData.features.map(async (feature) => {
          if (feature.icon && feature.icon.includes('s3')) {
            return {
              ...feature,
              iconSignedUrl: await getSignedUrlS3(feature.icon)
            };
          }
          return feature;
        })
      );
    }

    return res.status(200).json({
      success: true,
      data: aboutData,
      exists: Boolean(existing)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Hero Update
export const UpdateHero = async (req, res) => {
  try {
    const validation = heroUpdateSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { heroTitle, heroDescription, heroSubtitle } = validation.data;
    let heroImage = validation.data.heroImage;

    if (req.file) {
      const uploadedImage = await uploadFileToS3({
        buffer: req.file.buffer,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        folderType: "about",
      });
      heroImage = uploadedImage.url;
    }

    const updatedAbout = await AboutModel.findOneAndUpdate(
      { singletonKey: 'about-us' },
      {
        singletonKey: 'about-us',
        heroTitle,
        heroDescription,
        heroSubtitle,
        ...(heroImage && { heroImage }),
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Hero section updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Stats Update
export const UpdateStats = async (req, res) => {
  try {
    const validation = statsUpdateSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { stats } = validation.data;

    const updatedAbout = await AboutModel.findOneAndUpdate(
      { singletonKey: 'about-us' },
      { stats },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Stats updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Stat
export const DeleteStat = async (req, res) => {
  try {
    const validation = idSchema.safeParse(req.params);
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { id } = validation.data;
    const updatedAbout = await AboutModel.findOneAndUpdate(
      { singletonKey: 'about-us' },
      { $pull: { stats: { _id: id } } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Stat deleted successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Team Members CRUD
export const CreateTeamMember = async (req, res) => {
  try {
    const validation = teamMemberCreateSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { name, role } = validation.data;
    let image = validation.data.image;

    if (req.file) {
      const uploadedImage = await uploadFileToS3({
        buffer: req.file.buffer,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        folderType: "about",
      });
      image = uploadedImage.url;
    }

    const updatedAbout = await AboutModel.findOneAndUpdate(
      { singletonKey: 'about-us' },
      { $push: { teamMembers: { name, role, image } } },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Team member added successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const UpdateTeamMember = async (req, res) => {
  try {
    const idValidation = idSchema.safeParse(req.params);
    
    if (!idValidation.success) {
      return res.status(400).json({
        success: false,
        message: idValidation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const bodyValidation = teamMemberUpdateSchema.safeParse(req.body);
    
    if (!bodyValidation.success) {
      return res.status(400).json({
        success: false,
        message: bodyValidation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { id } = idValidation.data;
    const { name, role } = bodyValidation.data;
    let image = bodyValidation.data.image;

    if (req.file) {
      const uploadedImage = await uploadFileToS3({
        buffer: req.file.buffer,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        folderType: "about",
      });
      image = uploadedImage.url;
    }

    const updateData = {};
    if (name) updateData['teamMembers.$.name'] = name;
    if (role) updateData['teamMembers.$.role'] = role;
    if (image) updateData['teamMembers.$.image'] = image;

    const updatedAbout = await AboutModel.findOneAndUpdate(
      { singletonKey: 'about-us', 'teamMembers._id': id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const DeleteTeamMember = async (req, res) => {
  try {
    const validation = idSchema.safeParse(req.params);
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { id } = validation.data;

    const updatedAbout = await AboutModel.findOneAndUpdate(
      { singletonKey: 'about-us' },
      { $pull: { teamMembers: { _id: id } } },
      { new: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Features CRUD
export const CreateFeature = async (req, res) => {
  try {
    const validation = featureCreateSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { title, description } = validation.data;
    let icon = validation.data.icon;

    if (req.file) {
      const uploadedImage = await uploadFileToS3({
        buffer: req.file.buffer,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        folderType: "about",
      });
      icon = uploadedImage.url;
    }

    const updatedAbout = await AboutModel.findOneAndUpdate(
      { singletonKey: 'about-us' },
      { $push: { features: { title, description, icon } } },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Feature added successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const UpdateFeature = async (req, res) => {
  try {
    const idValidation = idSchema.safeParse(req.params);
    
    if (!idValidation.success) {
      return res.status(400).json({
        success: false,
        message: idValidation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const bodyValidation = featureUpdateSchema.safeParse(req.body);
    
    if (!bodyValidation.success) {
      return res.status(400).json({
        success: false,
        message: bodyValidation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { id } = idValidation.data;
    const { title, description } = bodyValidation.data;
    let icon = bodyValidation.data.icon;

    if (req.file) {
      const uploadedImage = await uploadFileToS3({
        buffer: req.file.buffer,
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        folderType: "about",
      });
      icon = uploadedImage.url;
    }

    const updateData = {};
    if (title) updateData['features.$.title'] = title;
    if (description) updateData['features.$.description'] = description;
    if (icon) updateData['features.$.icon'] = icon;

    const updatedAbout = await AboutModel.findOneAndUpdate(
      { singletonKey: 'about-us', 'features._id': id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ success: false, message: "Feature not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Feature updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const DeleteFeature = async (req, res) => {
  try {
    const validation = idSchema.safeParse(req.params);
    
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.errors.map((err) => err.message).join(", "),
      });
    }

    const { id } = validation.data;

    const updatedAbout = await AboutModel.findOneAndUpdate(
      { singletonKey: 'about-us' },
      { $pull: { features: { _id: id } } },
      { new: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ success: false, message: "Feature not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Feature deleted successfully",
      data: updatedAbout,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
