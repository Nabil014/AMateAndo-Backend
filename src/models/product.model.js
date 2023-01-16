const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  unit_price: { type: Number, required: true },
  stock: { type: Number, required: true },
  picture: { type: String, required: true },
  description: { type: String, required: true },
  visibility: { type: Boolean, default: true },
});

const model = mongoose.model("Product", ProductSchema);
module.exports = model;
