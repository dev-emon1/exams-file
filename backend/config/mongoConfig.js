const mongoose = require("mongoose");

const mongoConfig = () => {
  mongoose
    .connect(
      "mongodb+srv://emonhossain0096:8uJOg4quzSUc6Vh8@full-stack.pxqzs7l.mongodb.net/emonhossain0096?retryWrites=true&w=majority&appName=full-stack"
    )
    .then(() => {
      console.log("Database is connected");
    });
};

module.exports = mongoConfig;
