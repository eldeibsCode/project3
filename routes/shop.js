const path = require('path');

const express = require('express');

const router = express.Router();

// const rootDir = require('../util/path');
// const adminData = require('./admin');
const shopController = require('../controllers/shop')

router.get('/', shopController.getProducts);

// router.get('/products', shopController.getCart); //

router.get('/cart', shopController.getCart); //

// router.get('/checkout', shopController.getCart);//


module.exports = router;