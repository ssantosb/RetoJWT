var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var clientsRouter = require('./routes/clients');
var loginRouter = require('./routes/login');
var roleRouter = require('./routes/login');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/clients', clientsRouter);
app.use('/login', loginRouter);
app.use('/role', roleRouter);


module.exports = app;
