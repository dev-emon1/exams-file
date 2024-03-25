const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const resendMailController = async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.send({ error: "User not found" });
    }
    if (!findUser.emailVerified) {
      await User.findOneAndUpdate({ email: email }, { emailVerified: true });
      jwt.sign({ email: email }, "hello", async function (err, token) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "emonh7805@gmail.com",
            pass: "atjs rzlj jyez czgp",
          },
        });
        const info = await transporter.sendMail({
          from: "Exams file",
          to: email,
          subject: "Verification link",
          html: `Here is your verification link <a href='http://localhost:5173/verification/${token}'>Click me</a>`,
        });
      });
    } else {
      res.send({ error: "Email already verified" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = resendMailController;
