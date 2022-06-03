const path = require('path');

const express = require('express');

const router = express.Router();

// const rootDir = require('../util/path');
// const adminData = require('./admin');
const productsController = require('../controllers/products')

router.get('/', productsController.getProducts);

router.get('/products', productsController.getCart); //

router.get('/cart', productsController.getCart); //

router.get('/checkout', productsController.getCart);//


module.exports = router;