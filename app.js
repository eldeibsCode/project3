const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user");

const app = express();

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

// const res = require('express/lib/response');

app.use(bodyParser.urlencoded({ extended: false }));
// print all requests
// app.use('/', (req, res, next)=>{
//     console.log('app:path:',req.url);
//     next();
// });
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("62a52cc830f8f738020cc5d7")
    .then((user) => {
      console.log(user);
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminData);
app.use(shopRoutes);

app.use(errorController.get404);

const user = new User(1, "Moha");

mongoose
  .connect(
    "mongodb+srv://eldeib:DeutEgy.1992@cluster3.a03g7.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch(err => console.log(err));

