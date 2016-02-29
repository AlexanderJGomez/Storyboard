var Post = require('../models/post');
var User = require('../models/user');



exports.createPost = function(id, postMap, res, next) {

        Post.create(postMap, function(err, newPost) {
        	if(err)
        		res.send(err);
        	

            var opts = [{ path: 'creator', select: 'username' }]
            Post.populate(newPost, opts, function (err, user) {
                if(err)
                    res.send(err);
                return res.json(newPost);
            });

        })

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

exports.upvote = function(postid, upvoterid, res, next) {
    Post.findById(postid, function(err, post) {
        if(err)
            return res.send(err)
        else if(post.upVoters.indexOf(upvoterid) < 0) {
            post.upVotes = post.upVotes + 1;
            post.upVoters.push(upvoterid);
            console.log(post);
            post.save(function(err) {
                if (err)
                    return res.send(err)
                var opts = [{ path: 'creator', select: 'username' }];
                Post.populate(post, opts, function (err, post2) {
                if(err)
                    res.send(err);
                return res.json(post2);
            });
            })
        }
    })
}








// exports.deletePost = function(id, )