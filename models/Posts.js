var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	postcontent: String,
	upvotes: {type: Number, default: 0},
	downvotes: {type: Number, default: 0},
	created: {type: Date, default: Date.now()},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
PostSchema.methods.downvote = function(cb) {
  this.downvotes += 1;
  this.save(cb);
};

mongoose.model('Post', PostSchema);