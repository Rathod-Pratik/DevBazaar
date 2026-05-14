import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  type: { type: String, enum: ["credit", "debit"], required: true },
  amount: { type: Number, required: true },
  meta: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
});

const WalletSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  balance: { type: Number, default: 0 },
  transactions: { type: [TransactionSchema], default: [] },
}, { timestamps: true });

export default model("Wallet", WalletSchema);
