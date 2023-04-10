const express = require('express')
const router = express.Router()
const mercadopago = require('mercadopago')
const User = require('../models/user.model')

mercadopago.configure({
  access_token: `${process.env.ACCESS_TOKEN}`,
})

router.post('/', async function (req, res) {
  // Crea un objeto de preferencia (se le pueden poner muchas especificaciones como payer email por ej)
  const { name, lastname, dni, cellphone, address, codPostal, email, id } =
    req.body.infoShipping[0]

  try {
    const userExist = await User.findOneAndUpdate(
      { email },
      {
        idUser: id,
        name: name,
        lastname: lastname,
        dni: dni,
        cellphone: cellphone,
        address: address,
        codPostal: codPostal,
      }
    )
    if (!userExist) {
      const emailLower = email.toLowerCase()
      const newUser = new User({
        email: emailLower,
        idUser: id,
        name,
        lastname,
        dni,
        cellphone,
        address,
        codPostal,
      })
      await newUser.save()
    }
  } catch (error) {
    console.log(error)
  }
  let preference = {
    items: req.body.cart,
  }
  try {
    const response = await mercadopago.preferences.create(preference)
    const preferenceId = response.body.id
    res.send({ preferenceId })
  } catch (error) {
    console.log(error)
  }
})

router.get('/', async function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  })
})

module.exports = router
