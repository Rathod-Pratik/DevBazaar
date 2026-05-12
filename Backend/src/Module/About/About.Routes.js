import express from "express";
import {
  GetAbout,
  UpdateAbout,
  UpdateHero,
  UpdateStats,
  DeleteStat,
  CreateTeamMember,
  UpdateTeamMember,
  DeleteTeamMember,
  CreateFeature,
  UpdateFeature,
  DeleteFeature,
} from "./About.Controller.js";
import upload from "@middleware/Multer.Middleware.js";
import { verifyAdmin } from "@middleware/Auth.middleware.js";

const router = express.Router();

router.get("/getabout", GetAbout);

const typeHandler = (handlers) => {
  return (req, res) => {
    const type = req.query.type || req.body.type;
    const handler = handlers[type?.toLowerCase()];
    
    if (!handler) {
      return res.status(400).json({ success: false, message: "Invalid type parameter" });
    }
    
    return handler(req, res);
  };
};

// PUT endpoints with type parameter
router.put("/update", verifyAdmin, upload.single("image"), typeHandler({
  hero: UpdateHero,
  stats: UpdateStats,
  team: UpdateTeamMember,
  features: UpdateFeature,
}));

// POST endpoints with type parameter
router.post("/update", verifyAdmin, upload.single("image"), typeHandler({
  team: CreateTeamMember,
  features: CreateFeature,
}));

// DELETE endpoints with type parameter and ID
router.delete("/delete/:id", verifyAdmin, typeHandler({
  stats: DeleteStat,
  team: DeleteTeamMember,
  features: DeleteFeature,
}));

export default router;
