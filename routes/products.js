const { allProductsStatic, allProducts } = require('../controllers/products.js')

const express = require('express')
const router = express.Router()

router.route('/').get(allProducts)
router.route('/static').get(allProductsStatic)

module.exports = router
