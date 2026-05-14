import express from "express";
import { verifyAdmin } from "../../Middleware/Auth.middleware.js";
import { GetUser, BlockUser, DeleteUser, UnblockUser } from "./User.Controller.js";

const router = express.Router();

router.get("/getUser", verifyAdmin, GetUser);
router.post("/blockUser/:_id", verifyAdmin, BlockUser);
router.post("/UnblockUser/:_id", verifyAdmin, UnblockUser);
router.delete("/deleteUser/:_id", verifyAdmin, DeleteUser);

export default router;
