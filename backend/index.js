require("dotenv").config();
const express = require("express");
const cors = require("cors");
const route = require("./routes");
const mongoConfig = require("./config/mongoConfig");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
// routes
app.use("/", route);

// database
mongoConfig();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
