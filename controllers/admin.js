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
    
    const product = new Product(title, imageUrl, description, price);
    // console.log(product);
    product.save();
    res.redirect("/");
}

exports.getEditProduct = (req, res, next) =>{
    // console.log(req.query);
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/');
        }
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product
          });
    });
    
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products'});
    });
}