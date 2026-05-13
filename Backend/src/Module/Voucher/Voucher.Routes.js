import express from "express";
import { ApplyVoucherToOrder, CreateVoucher, DeleteVoucher, GetAllVoucher, GetVoucherById, UpdateVoucher } from "./Voucher.Controller.js";
import { verifyAdmin, verifyUser } from "../../Middleware/Auth.middleware.js";

const route = express.Router();

route.post("/create", verifyAdmin, CreateVoucher);
route.get("/all", verifyAdmin, GetAllVoucher);
route.get("/:_id", verifyAdmin, GetVoucherById);
route.put("/update", verifyAdmin, UpdateVoucher);
route.delete("/:_id", verifyAdmin, DeleteVoucher);
route.post("/apply", verifyUser, ApplyVoucherToOrder);

export default route;
