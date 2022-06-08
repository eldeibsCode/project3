const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs  = require('express-handlebars');

const errorController = require('./controllers/error');

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
const shopRoutes = require('./routes/shop')


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


// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);