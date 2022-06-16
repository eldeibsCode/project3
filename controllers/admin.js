const { rawListeners } = require("../models/products");
const Product = require("../models/products");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  // console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created product");
      res.redirect("/admin/products");
    })
    .catch((err = (err) => console.log(err)));
};

exports.getEditProduct = (req, res, next) => {
  // console.log(req.query);
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.updateOne({_id: prodId}, {
    title: updatedTitle,
    price: updatedPrice,
    description: updatedDescription,
    imageUrl: updatedImageUrl,
  })
    .then((result) => {
      console.log("Product updated");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
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
  console.log("from getProds");
  Product.find()
    // req.user.getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin products",
        path: "/admin/products",
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({_id: prodId})
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
