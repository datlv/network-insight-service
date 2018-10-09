var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fsx = require('fs-extra');

var hostname = 'localhost';
var port = 3000;
var apiVersion = "v1";
var app = express();

// A list of routers
var routes = require('./routes/index');
var channelRouter = require('./routes/channelRouter');
// var auditorRouter = require('./routes/auditorRouter');
// var orgRouter = require('./routes/orgRouter');
// var partyRouter = require('./routes/partyRouter');
// var locationRouter = require('./routes/locationRouter');
// var assetRouter = require('./routes/assetRouter');
// var productRouter = require('./routes/productRouter');
// var logRouter = require('./routes/logRouter');
// var supplyChainRouter = require('./routes/supply-chainRouter');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('common', {
  stream: fsx.createWriteStream('/tmp/network-status-service-access.log', { flags: 'a' })
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/' + apiVersion + '/channel', channelRouter);
// app.use('/api/' + apiVersion + '/auditors', auditorRouter);
// app.use('/api/' + apiVersion + '/orgs', orgRouter);
// app.use('/api/' + apiVersion + '/parties', partyRouter);
// app.use('/api/' + apiVersion + '/locations', locationRouter);
// app.use('/api/' + apiVersion + '/assets', assetRouter);
// app.use('/api/' + apiVersion + '/products', productRouter);
// app.use('/api/' + apiVersion + '/logs', logRouter);
// app.use('/api/' + apiVersion + '/supply-chains', supplyChainRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
