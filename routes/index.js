var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var auth = require('http-auth');
var basic = auth.basic({
    realm: "Login",
    file: __dirname + "/../users.htpasswd"
});

/* GET home page. */
router.get('/', auth.connect(basic), function(req, res, next) {
    //var count = req.param('count');
    db = new Datastore({ filename: 'db.json', autoload: true });
    db.find().sort({time:-1}).exec(function (err, posts) {
        //console.log(posts);
        res.render('index', {posts : posts});
    });
});

module.exports = router;
