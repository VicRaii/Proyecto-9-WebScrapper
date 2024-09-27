const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: false },
  },
  {
    timestamps: true,
    collection: "LakersProducts",
  }
);

const Product = mongoose.model("LakersProduct", productSchema, "LakersProduct");

module.exports = Product;
