const path = require('../util/path');

const Product = require('../models/products');
const Cart = require('../models/cart');
const CartItems = require('../models/cart-item');

exports.getProducts =  (req, res, next) =>{
    // console.log("in another middleware!");
    // console.log('shop.js:', adminData.products);
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All products',
                path: '/products'});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // console.log(prodId);
    Product.findByPk(prodId)
        .then(product => {
                // console.log(product[0]);
                res.render('shop/product-detail',{
                    product: product,
                    pageTitle: product.title,
                    path:'/products'
                });
            }
        )
        .catch(err => {console.log(err)});
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'});
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next)=>{
    req.user.getCart()
        .then(cart => {
            // console.log(cart);
            return cart.getProducts();
        })
        .then(products => {
                res.render("shop/cart", { 
                pageTitle: "Your Cart", 
                path: "/cart",
                products: products
            });
        })
        .catch(err => console.log(err));

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: prodId}});
        })
        .then(products => {
            let product;
            if(products > 0){
                product = products[0];
            }
            let newQuantity = 1;
            if(product){
                // ...
            }
            return Product.findByPk(prodId)
                .then(product => {
                    return fetchedCart.addProduct(product, { 
                        through: {quantity : newQuantity} 
                    });
                })
                .then(()=>{
                    res.redirect('/cart');
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    
    // my approach
    // let cartId;
    // req.user.getCart()
    //     .then(cart => {
    //         cartId = cart.id;
    //         return CartItems.findOne({where: {cartId: cartId}});
    //     })
    //     .then(cartitem => {
    //         if(!cartitem){
    //             return CartItems.create({cartId: cartId, productId: prodId});
    //         }else{
    //             console.log(cartitem);
    //             cartitem.update({quantity: cartitem.quantity + 1});
    //         }
    //         res.redirect('/cart');
    //     })
    //     .catch(err => console.log(err));

};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.getOrders = (req, res, next)=>{
    res.render("shop/orders", { 
        pageTitle: "Your Orders", 
        path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};