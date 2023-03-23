const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const uri = process.env.DB_URL

mongoose.connect(uri).then(
  () => {
    console.log('****Conectado en el puerto 3000****')
  },
  (err) => console.log(err)
)

module.exports = mongoose
