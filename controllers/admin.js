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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    
    const product = new Product(title, imageUrl, description, price);
    console.log(product);
    product.save();
    res.redirect("/");
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products'});
    });
}