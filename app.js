const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require("./controllers/error");

const User = require("./models/user");

const MONGODB_URI = require("./usersData/data").mongodbUri;

const app = express();
const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf(); 

// engine template :Pug
// app.set('view engine', 'pug');

//engine template: handlebars
// app.engine(
//     "hbs",
//     expressHbs.engine({
//       extname: "hbs",
//       defaultLayout: false,
//       layoutsDir: "views/layouts/"
//     })
//   );
// app.set('view engine', 'hbs');

// engine template: ejs
app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// const res = require('express/lib/response');

app.use(bodyParser.urlencoded({ extended: false }));

// // print all requests
// app.use("/", (req, res, next) => {
//   console.log("app:path:", req.url);
//   next();
// });

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use("/", (req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();

  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      // console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminData);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// const user = new User(1, "Moha");

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log(`Server running in port 3000`);
  })
  .catch((err) => console.log(err));
