const { render } = require('express/lib/response');
const Product = require('../models/products');

exports.getAddProduct = (req, res, next) =>{
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing:false
    });
};

exports.postAddProduct =  (req, res, next) =>{
    // console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
        .then(result => {
            // console.log(result);
            console.log('Created product');
            res.redirect('/admin/products');
        })
        .catch(err = err => console.log(err));
};

exports.getEditProduct = (req, res, next) =>{
    // console.log(req.query);
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts(prodId)
    // Product.findByPk(prodId)
        .then(products => {
            const product = products[0];
            if(!product){
                return res.redirect('/');
            }
            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product
              });
        })
        .catch(err => {
            console.log(err);
        });
    
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.findByPk(prodId)
        .then(product =>{
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription;
            return product.save();
        }).then(result => {
            console.log('Product updated');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    // other approach
    // Product.update({
    //     title: updatedTitle,
    //     price: updatedPrice,
    //     imageUrl: updatedImageUrl,
    //     description: updatedDescription
    //     }, {
    //     where: {
    //       id: prodId
    //     }})
    //     .then(result => {
    //         console.log(result);
    //         console.log('Product updated')
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    // Product.findAll()
    req.user.getProducts()
        .then( products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res ,next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy()
        })
        .then(result => {
            console.log('Product destroyed');
            res.redirect('/admin/products')
        })
        .catch(err => {
        console.log(err);
    });  
};