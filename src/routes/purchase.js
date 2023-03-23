const express = require('express')
const router = express.Router()
const Purchase = require('../models/purchase.model.js')

const multer = require('multer')
const upload = multer()

router.post('/', upload.none(), async (req, res) => {
  const { idUser, email, products, address, note } = req.body
  console.log(req.body)
  try {
    const newPurchase = new Purchase({
      idUser,
      email,
      products,
      address,
      note,
    })
    await newPurchase.save()
    res.status(201).json(newPurchase)
  } catch (error) {
    console.log(error)
    res.status(404).send('Faltan datos')
  }
})

module.exports = router
