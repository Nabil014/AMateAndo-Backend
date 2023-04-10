const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  dni: { type: Number, required: true },
  cellphone: { type: Number, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  idUser: { type: String, required: true },
})

const model = mongoose.model('User', UserSchema)
module.exports = model
