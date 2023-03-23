const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PurchaseSchema = new Schema({
  idUser: { type: String, require: true },
  email: { type: String, require: true },
  products: [
    {
      name: { type: String },
      qty: { type: Number },
    },
  ],
  address: { type: String, require: true },
  note: { type: String },
})

const model = mongoose.model('Purchase', PurchaseSchema)
module.exports = model
