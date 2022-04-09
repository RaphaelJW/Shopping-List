var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var compression = require('compression')
var helmet = require('helmet')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shoppingListRouter = require('./routes/shoppinglist');

var app = express();

//configure helmet
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives:{
      "script-src": ["'self'", "cdn.jsdelivr.net/npm/bootstrap@5.0.2/"]
    }
  })
)

//MongoDB setup
var mongoose = require("mongoose");
//var mongoDB = 'mongodb+srv://dbUser:tinware-confuse-shrive@cluster0.ha2vo.mongodb.net/shopping-list?retryWrites=true&w=majority'

var dev_db_url = 'mongodb+srv://dbUser:tinware-confuse-shrive@cluster0.ha2vo.mongodb.net/shopping-list?retryWrites=true&w=majority'
var mongoDB = process.env.MONGODB_URI || dev_db_url

mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shoppinglist', shoppingListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
