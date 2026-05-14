import express from "express";
import * as WalletController from "./Wallet.Controller.js";

const router = express.Router();

router.get("/balance/:userId", WalletController.getBalance);
router.post("/add", WalletController.addFunds);
router.post("/withdraw", WalletController.withdrawFunds);
router.get("/transactions", WalletController.getTransactions);

export default router;
