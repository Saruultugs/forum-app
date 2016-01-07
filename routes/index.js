var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Category = mongoose.model('Category');


// Route Parameters
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);
  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});
router.param('category', function(req, res, next, id) {
  var query = Category.findById(id);
  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error('can\'t find category')); }
    req.category = category;
    return next();
  });
});
router.param('categoryslug', function(req, res, next, slug) {
  var query = Category.findOne({'categoryslug': slug});
  query.exec(function (err, category){
    if (err) { return next(err); }
    if (!category) { return next(new Error('can\'t find category slug')); }
    req.categoryslug = category;
    return next();
  });
});

/* Main Page and Bootstrap with Angular. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Forum Home' });
});



module.exports = router;
