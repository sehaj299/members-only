var createError = require('http-errors');
var express = require('express')
var path = require('path');
var cookieParser = require('cookie-parser');
var MongoStore=require('connect-mongo')

var logger = require('morgan');
var mongoose=require('mongoose')
var passport=require("passport")
var LocalStrategy=require('passport-local').Strategy
const bcrypt=require('bcrypt')
const User=require('./models/user')
var session=require('express-session')




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter=require('./routes/catalog')

var app = express();
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const mongoDB = process.env.MONGO_KEY;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get("/catalog/login",(req,res)=> res.render('login'))
app.use(session(
  {store: MongoStore.create({ mongoUrl: process.env.MONGO_KEY }),
  resave:false,
  saveUninitialized:true,
  secret:"sehaj"
}))

passport.use(

  new LocalStrategy((username, password, done) => {

    User.findOne({ username: username }, (err, user) => {

      if (err) {

        return done(err);

      }

      if (!user) {

        return done(null, false, { message: "Incorrect username" });

      }

      bcrypt.compare(password, user.password, (err, res)=>{

        if(res){

          return done(null, user);

        }

        else {

          return done(null, false, { message: "Incorrect password" });

        }

      })

    });

  })

);

passport.serializeUser(function(user, done) {

  done(null, user.id);

});



passport.deserializeUser(function(id, done) {

  User.findById(id, function(err, user) {

    done(err, user);

  });

});
app.use(passport.initialize())
app.use(passport.session());
app.post("/catalog/login",passport.authenticate("local"),(req,res)=>{
  res.send("login successfuly")
})      

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog',catalogRouter)

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
