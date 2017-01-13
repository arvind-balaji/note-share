var express = require('express');
var router = express.Router();
var Datastore = require('nedb');

/* GET home page. */
router.get('/', function(req, res, next) {
    //var count = req.param('count');
    db = new Datastore({ filename: 'db.json', autoload: true });
    db.find().sort({time:-1}).exec(function (err, posts) {
        //console.log(posts);
        res.render('index', {posts : posts});
    });
});

module.exports = router;
