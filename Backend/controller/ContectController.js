const nodemailer = require("nodemailer");
const ContectModel = require("../model/ContectModel");
async function Contect(req, res) {

    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: "rathodpratik1928@gmail.com",
      pass: "kusm lsut pxoh wpkr",//use env for this
    },
  });

  const receiver={
    from:email,
    to:"rathodpratik1928@gmail.com",
    subject:"Contect Us",
    text:`Name:${name}\nEmail:${email}\nPhone:${phone}\nMessage:${message}`
  }

  auth.sendMail(receiver, async(error, emailResponse) => {
    if (error) {
      console.error("Failed to send email:", error);
      return res.status(500).json({ message: "Error sending email" });
    }
    console.log("Email sent successfully!");
    await ContectModel.create({
      name,
      email,
      phone,
      message,
    });
    res.status(200).json({ message: "Email sent successfully!" });
  });
}

module.exports = Contect;
