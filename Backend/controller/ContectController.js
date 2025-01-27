const ContectModel = require("../model/ContectModel");

async function Contect(req, res) {

    const { name, email, number, message } = req.body;

    if (!name || !email || !number || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    await ContectModel.create({
      name,
      email,
      number,
      message,
    });
    res.status(200).json({ message: "Message sent successfully!" });
  };


module.exports = Contect;
