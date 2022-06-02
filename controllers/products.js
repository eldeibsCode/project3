const products = [];

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
    products.push({title : req.body.title});
    // console.log(products);
    res.redirect("/");
}
exports.getProducts =  (req, res, next) =>{
    // console.log("in another middleware!");
    // console.log('shop.js:', adminData.products);
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'});
}
exports.getNotFoundPage = (req, res) =>{
    // console.log("undefined router is visited!");
    // console.log(req.path);
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    res.status(404).render('404', {pageTitle: 'Page not found', path: path.basename(req.url)})
}