var Post = require('../models/post');
var User = require('../models/user');



exports.createPost = function(id, postMap, res, next) {

        Post.create(postMap, function(err, newPost) {
        	if(err)
        		res.send(err);
        	
        	return res.json({
        			userWhoPosted: id,
        			postAddedSays: newPost.text
        		});
});

}


exports.getPost = function(id, res, next) {
    Post.findById(id, function(err, post) {
        if(err)
            res.send(err);
        return res.json(post);
    });
}


exports.getAllPosts = function(res, next) {
    Post.find(function(err, posts) {
            if (err)
                return res.send(err);

            return res.json(posts);
        });
}








// exports.deletePost = function(id, )