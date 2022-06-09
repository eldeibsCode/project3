const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs  = require('express-handlebars');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/products');
const User = require('./models/user');


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
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop');
const res = require('express/lib/response');


app.use(bodyParser.urlencoded({extended: false}));

// print all requests 
// app.use('/', (req, res, next)=>{
//     console.log('app:path:',req.url);
//     next();
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
    .sync()
    .then(result => {
        // console.log(result);
        // const server = http.createServer(app);
        // server.listen(3000);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

