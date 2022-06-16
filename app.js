const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");

const User = require("./models/user");

const MONGODB_URI = require('./usersData/data').mongodbUri;

const app = express();
const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

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
  session({ secret: "my secret", resave: false, saveUninitialized: false, store: store})
);

app.use((req, res, next) => {
  User.findById("62a8a20b3f634d0bd67ad894")
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
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Moha",
          email: "moha@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
    console.log(`Server running in port 3000`);
  })
  .catch((err) => console.log(err));
