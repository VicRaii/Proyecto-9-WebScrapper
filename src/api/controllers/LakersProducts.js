const Product = require("../models/LakersProducts");
const LakersProducts = require("../../../LakersProducts.json");

const insertPoducts = async (req, res, next) => {
  try {
    await Product.insertMany(LakersProducts.products);
    return res.status(201).json("Success uploading products to Database");
  } catch (error) {
    return res.status(400).json("Error uploading products to Database", error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(400).json("Error getting all products", error);
  }
};

module.exports = { insertPoducts, getAllProducts };
