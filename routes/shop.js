const path = require('path');

const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');
const adminData = require('./admin');

router.get('/', (req, res, next) =>{
    // console.log("in another middleware!");
    // console.log('shop.js:', adminData.products);
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

    const products = adminData.products;
    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'});
});

module.exports = router;