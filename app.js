const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs  = require('express-handlebars');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/products');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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
app.use((req, res, next) => {
    User.findByPk(1)
        .then( user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});


app.use('/admin', adminData);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});


sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1)
        // console.log(result);
        
    })
    .then( user => {
        if (!user){
            return User.create({name:'max', email:'max@max.com'});
        }
        return Promise.resolve(user);
    })
    .then(user => {
        return user.getCart({where:{id: 1}})
        
    }).then(cart => {
        if(!cart){
            return Cart.create({id:1, userId: 1});
        }
        return Promise.resolve(cart);
    }).then(cart => {
        // console.log(cart);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

