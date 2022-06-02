const Product = require('../models/products');

exports.getAddProduct = (req, res, next) =>{
    // console.log("in another middleware!");
    // console.log(rootDir);
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    res.render("add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
};

exports.postAddProduct =  (req, res, next) =>{
    console.log(req.body);
    const product = new Product();
    product.save(req.body.title);
    // console.log(products);
    res.redirect("/");
}
exports.getProducts =  (req, res, next) =>{
    // console.log("in another middleware!");
    // console.log('shop.js:', adminData.products);
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

    res.render('shop', {prods: Product.fetchAll(), pageTitle: 'Shop', path: '/'});
}
