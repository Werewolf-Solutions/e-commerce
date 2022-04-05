var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var passport = require('passport')
var session = require('express-session')
var MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

// .env
require('dotenv').config()

// DB config
const connetDB = require('./config/db')
connetDB()

// Passport Config
require('./config/passport')(passport)

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

app.set('trust proxy', 1) // trust first proxy
app.disable('x-powered-by')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'production-test') {
  app.use(express.static(path.join(__dirname, 'public/build')))
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'))
  })
}

// Session
const {
  SESSION_SECRET,
  SESSION_NAME,
  NODE_ENV,
  // SESSION_LIFETIME
} = process.env

const IN_PROD = NODE_ENV === 'production'

// 1 hour = 1000 * 60 * 60
const SESSION_LIFETIME = 1000 * 60 * 60 * 3

app.use(session({
  resave: false,
  saveUninitialized: false,
  // proxy: IN_PROD,
  // secureProxy: IN_PROD,
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  // store: MongoStore.create({ mongoUrl: mongoose.connection_connectionString }),
  cookie: {
      secure: IN_PROD,
      maxAge: SESSION_LIFETIME,
      httpOnly: true,
      sameSite: true
  }
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
