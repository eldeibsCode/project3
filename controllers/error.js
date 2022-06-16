const path = require("path");

exports.get404 = (req, res) => {
  // console.log("undefined router is visited!");
  // console.log(req.path);
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

  res
    .status(404)
    .render("404", {
      pageTitle: "Page not found",
      path: path.basename(req.url),
      isAuthenticated: req.session.isLoggedIn
    });
};
