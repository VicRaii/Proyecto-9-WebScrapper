const {
  insertPoducts,
  getAllProducts,
} = require("../controllers/LakersProducts");

const LakersProductRouter = require("express").Router();

LakersProductRouter.post("/post", insertPoducts);
LakersProductRouter.get("/", getAllProducts);

module.exports = LakersProductRouter;
