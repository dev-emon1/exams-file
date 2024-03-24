const express = require("express");
const route = express.Router();
const registrationController = require("../../controllers/registrationController");
const linkController = require("../../controllers/linkController");

route.post("/registration", registrationController);
route.post("/verification", linkController);

module.exports = route;
