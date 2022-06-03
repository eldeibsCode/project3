const Product = require('../models/products');

exports.getAddProduct = (req, res, next) =>{
    // console.log("in another middleware!");
    // console.log(rootDir);
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    res.render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
};

exports.postAddProduct =  (req, res, next) =>{
    // console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
}