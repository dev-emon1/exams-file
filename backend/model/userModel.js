const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Merchant", "User"],
    default: "User",
  },
});

module.exports = mongoose.model("User", userModel);
