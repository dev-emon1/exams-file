const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const emailValidation = require("../middleware/emailValidation");
const jwt = require("jsonwebtoken");

const registrationController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.send({ error: "All field are require" });
    }
    if (password && password.length < 6) {
      return res.send({ error: "Must be longer" });
    }
    if (!emailValidation(email)) {
      return res.send({ error: "email is not valid" });
    }

    const existingUser = await User.find({ email: email });

    if (existingUser && existingUser.length > 0) {
      return res.send({ error: "Email already used" });
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        const user = new User({
          name: name,
          email: email,
          password: hash,
        });
        await user.save();

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

        res.send({ name: user.name, email: user.email });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = registrationController;
