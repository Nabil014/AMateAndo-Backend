const { Router } = require('express');
const bodyParser = require("body-parser");
const router = Router();

router.use(bodyParser.json());

const userRoute = require('./users')
const productRoute = require('./product.route')
const loginGoogle= require('./loginGoogle')
const loginRoute= require('./login')
const paymentRoute= require('./payment')

router.use("/api/user", userRoute);
router.use("/api/product", productRoute);
router.use("/api/login/google", loginGoogle);
router.use("/api/login", loginRoute); 
router.use("/api/payment", paymentRoute); 



module.exports = router;
