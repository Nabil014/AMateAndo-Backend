const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true},
  products: [
    {
      _id: false,
      id: String,
      qty: Number,
    }
  ],
});

const model = mongoose.model("Order", orderSchema);
module.exports = model;
