import WalletModel from "./Wallet.Model.js";
import { validate, userIdSchema, addFundsSchema, withdrawSchema, getHistorySchema } from "./Wallet.Validation.js";
import { invalidateWalletCache, getCachedBalance, setCachedBalance } from "./Wallet.Cache.js";

const formatValidationErrors = (error) => error.issues.map((i) => i.message).join(", ");

export const getBalance = async (req, res) => {
  const validated = userIdSchema.safeParse(req.params);
  if (!validated.success) return res.status(400).json({ message: formatValidationErrors(validated.error) });

  const { userId } = validated.data;

  try {
    const cached = await getCachedBalance(userId);
    if (cached) return res.status(200).json({ balance: cached.balance });

    let wallet = await WalletModel.findOne({ userId });
    if (!wallet) {
      wallet = await WalletModel.create({ userId, balance: 0, transactions: [] });
    }

    await setCachedBalance(userId, { balance: wallet.balance });
    return res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error getting balance:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addFunds = async (req, res) => {
  const validated = addFundsSchema.safeParse(req.body);
  if (!validated.success) return res.status(400).json({ message: formatValidationErrors(validated.error) });

  const { userId, amount, meta } = validated.data;

  try {
    let wallet = await WalletModel.findOne({ userId });
    if (!wallet) {
      wallet = await WalletModel.create({ userId, balance: 0, transactions: [] });
    }

    wallet.balance = (wallet.balance || 0) + amount;
    wallet.transactions.unshift({ type: "credit", amount, meta });
    await wallet.save();

    await invalidateWalletCache();
    await setCachedBalance(userId, { balance: wallet.balance });

    return res.status(200).json({ success: true, balance: wallet.balance });
  } catch (error) {
    console.error("Error adding funds:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const withdrawFunds = async (req, res) => {
  const validated = withdrawSchema.safeParse(req.body);
  if (!validated.success) return res.status(400).json({ message: formatValidationErrors(validated.error) });

  const { userId, amount, meta } = validated.data;

  try {
    let wallet = await WalletModel.findOne({ userId });
    if (!wallet) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    if ((wallet.balance || 0) < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    wallet.balance = (wallet.balance || 0) - amount;
    wallet.transactions.unshift({ type: "debit", amount, meta });
    await wallet.save();

    await invalidateWalletCache();
    await setCachedBalance(userId, { balance: wallet.balance });

    return res.status(200).json({ success: true, balance: wallet.balance });
  } catch (error) {
    console.error("Error withdrawing funds:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTransactions = async (req, res) => {
  const validated = getHistorySchema.safeParse(req.query);
  if (!validated.success) return res.status(400).json({ message: formatValidationErrors(validated.error) });

  const { userId, page = 1, limit = 20 } = validated.data;
  const skip = (page - 1) * limit;

  try {
    const wallet = await WalletModel.findOne({ userId });
    if (!wallet || !wallet.transactions || wallet.transactions.length === 0) {
      return res.status(200).json({ items: [], page, limit, total: 0, totalPages: 0 });
    }

    const total = wallet.transactions.length;
    const items = wallet.transactions.slice(skip, skip + limit);

    return res.status(200).json({ items, page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
