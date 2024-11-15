var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
var app = express();
var cors = require('cors');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit the process on error
});
console.log('MongoDB URI:', process.env.MONGO_URI);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
const productRoutes= require('./routes/productRoutes');
const cartRoutes= require('./routes/cartRoutes');
const wishlistRoutes= require('./routes/wishlistRoutes');
// Sample product data
// const products = [
//     { _id: '1', name: 'Orphan War', description: 'A novel by Dantiel W. Moniz', price: 12.99, image: '/assests/image1.jpg' },
//     { _id: '2', name: 'Briderton', description: 'A novel by Mieko Kawakami', price: 15.99, image: '/assests/image2.jpg' },
//     { _id: '3', name: 'The Last Resort', description: 'A novel by Colson Whitehead', price: 18.99, image: '/assests/image3.jpg' },
// ];

// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/wishlist',wishlistRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(PORT, () => {
  console.log(`${PORT}`);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
