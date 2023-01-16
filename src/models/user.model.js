const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cellPhone: { type: String },
  picture: { type: String },
  verified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  visibility: { type: Boolean, default: true },
});

UserSchema.methods.encryptPass = async function(password){
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

const model = mongoose.model("User", UserSchema);
module.exports = model;
