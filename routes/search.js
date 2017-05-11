var express = require('express');
var router = express.Router();
var Datastore = require('nedb');
var auth = require('http-auth');
var fuzzy = require('fuzzy');

var basic = auth.basic({
    realm: "Login",
    file: __dirname + "/../users.htpasswd"
});

/* GET home page. */
router.get('/', function(req, res, next) {
        //var count = req.param('count');
        if(req.query.str && (req.query.str != "")){
            console.log(req.query.str);
            //db = new Datastore({ filename: 'db.json', autoload: true });
            db.find().sort({time:-1}).exec(function (err, posts) {
                var options = {
                extract: function(el) { return el.title; }
                }
                var results = fuzzy.filter(req.query.str.trim(), posts, options);
                var matches = results.map(function(el) { return el.original; });
                res.render('search', {posts : matches, data: {str : req.query.str}});
            });
        }else{
        //res.render('index', {posts : posts});
        res.redirect(301, "/")
        }

        //res.status(204).end();

});

module.exports = router;
