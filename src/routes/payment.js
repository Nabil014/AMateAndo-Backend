const express = require("express");
const router = express.Router();

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: `${process.env.ACCESS_TOKEN}`,
});

router.post("/", async function (req, res, next) {
 
  // Crea un objeto de preferencia (se le pueden poner muchas especificaciones como payer email por ej)
  let preference = {
    items: req.body,
    payment_methods: {
      installments: 6,
      excluded_payment_types: [
        {
          id: "ticket",
        },
      ],
    },
    back_urls: {
      success: "http://localhost:3001/status",
      failure: "http://localhost:3000/",
      pending: "http://localhost:3000/",
    },
  };
  
  try {
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
    console.log(response, "response");
    res.send({ preferenceId });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

module.exports = router;
