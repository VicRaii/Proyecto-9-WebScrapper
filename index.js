require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const LakersProductRouter = require("./src/api/routes/LakersProducts");

const app = express();
connectDB();

app.use("/api/v1/lakers", LakersProductRouter);

app.use("*", (req, res, next) => {
  return res.status(404).json("Route Not Found");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
