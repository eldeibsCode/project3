const Product = require('../models/products');
const path = require('../util/path');

exports.getProducts =  (req, res, next) =>{
    // console.log("in another middleware!");
    // console.log('shop.js:', adminData.products);
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

    Product.fetchAll( products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products'});
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        // console.log(product);
        res.render('shop/product-detail',{
            product: product,
            pageTitle: product.title,
            path:'/products'
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'});
    });
}

exports.getCart = (req, res, next)=>{
    res.render("shop/cart", { 
        pageTitle: "Your Cart", 
        path: "/cart" });
} 

exports.getOrders = (req, res, next)=>{
    res.render("shop/orders", { 
        pageTitle: "Your Orders", 
        path: "/orders" });
} 
exports.getCheckout = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}