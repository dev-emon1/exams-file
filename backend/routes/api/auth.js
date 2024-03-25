const express = require("express");
const route = express.Router();
const registrationController = require("../../controllers/registrationController");
const linkController = require("../../controllers/linkController");
const resendMailController = require("../../controllers/resendMailController");

route.post("/registration", registrationController);
route.post("/verification", linkController);
route.post("/resendmail", resendMailController);

module.exports = route;
