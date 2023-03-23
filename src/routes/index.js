const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()

router.use(bodyParser.json())

const productRoute = require('./product')
const paymentRoute = require('./payment')
const purchaseRoute = require('../routes/purchase')

router.use('/api/product', productRoute)
router.use('/api/payment', paymentRoute)
router.use('/api/purchase', purchaseRoute)

module.exports = router
