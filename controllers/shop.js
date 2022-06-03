const Product = require('../models/products');

exports.getProducts =  (req, res, next) =>{
    // console.log("in another middleware!");
    // console.log('shop.js:', adminData.products);
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

    Product.fetchAll( products => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Shop', path: '/'});
    });
}
exports.getCart = (req, res)=>{
    res.render('shop/cart', {pageTitle: 'Cart', path: '/cart'});
} 
