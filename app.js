var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var admin = require('./routes/admin');
var Datastore = require('nedb');
var linkify = require('linkify-it')();
db = new Datastore({ filename: 'db.json', autoload: true });
var auth = require('http-auth');
var basic = auth.basic({
    realm: "Main",
    file: __dirname + "/users.htpasswd"
});

var app = express();

//Comment out to disable .htpasswd authentication.
//app.use(auth.connect(basic));

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
app.use('/admin', admin);

//basic validation for blank posts - to be improved/rewritten
function validatePost(post){
    if(!post.title.trim()){
        return false;
    }
    if (post.type == "link"){
        if(!post.post.trim() && linkify.test(post.post)){
            return false;
        }
        post.post = linkify.match(post.post)[0].url;
    }
    return true;
}
//save new post to database
app.post('/api/newPost', function (req, res) {
    var post = {"type":req.body.type,"title":req.body.title,"post":req.body.post,"time": + new Date()};
	//console.log(post);
    if(validatePost(post)){db.insert(post)};
    res.status(204).end();
});

app.post('/api/deletePost', function (req, res) {
    var posts = JSON.parse(req.body.posts);
    //console.log(posts);
    if(req.get('Referrer').toLowerCase().includes("admin")){
        for (post of posts) {
            //console.log(post)
            db.remove({ _id: post }, {});
        }
        res.status(204).end();
    }
	//console.log(post);
    res.status(401).end();
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
