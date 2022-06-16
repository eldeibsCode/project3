const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").trim().split("=")[1];
  console.log(req.session);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("62a8a20b3f634d0bd67ad894")
    .then((user) => {
      // console.log(user);
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
