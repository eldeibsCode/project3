const Product = require('../models/products');

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

exports.getIndex = (req, res, next) => {
    res.render('shop/index', {pageTitle: 'Shop', path: '/'});
}

exports.getCart = (req, res, next)=>{
    res.render("shop/cart", { 
        pageTitle: "Your Cart", 
        path: "/cart" });
} 

exports.getCheckout = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}