const express = require("express");
const route = express.Router();
const auth = require("./auth");

route.use("/", auth);

module.exports = route;
