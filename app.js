var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var Datastore = require('nedb');
db = new Datastore({ filename: 'db.json', autoload: true });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// db.findOne({ _id: 1 }, function (err, doc) {
//   doc = doc || { _id: 1, counter: 0 };
//
//   console.log('This example was executed ' + doc.counter + ' times. Last access time was ' + doc.lastSeetAt);
//
//   doc.lastSeetAt = new Date();
//   doc.counter++;
//
//   db.update({ _id: 1 }, doc, { upsert: true }, function (err, num) {
//     console.log('Updated ' + num + ' records');
//   });
// });

// post.count = i;
//db.insert(post);
// db.find({}, function (err, doc) {
//     console.log(doc);
// });
//write settings recieved from client to settings.json
app.post('/api/newPost', function (req, res) {
    var post = {"title":req.body.title,"caption":req.body.text,"time": + new Date()}

	console.log(post);
    db.insert(post);
	res.status(200).end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
