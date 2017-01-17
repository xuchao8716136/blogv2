//Created by xuchao on 2017/1/16.
let marked = require('marked');
let Post = require('../lib/mongo').Post;
let CommentModel = require('./comments');

// 存放代码
Post.plugin('addCommentsCount', {
    afterFind:  (posts) => {
        return Promise.all(posts.map( (post) => {
            return CommentModel.getCommentsCount(post._id).then( (commentsCount) =>{
                post.commentsCount = commentsCount;
                return post;
            });
        }));
    },
    afterFindOne: (post) => {
        if (post) {
            return CommentModel.getCommentsCount(post._id).then( (count) => {
                post.commentsCount = count;
                return post;
            });
        }
        return post;
    }
});
Post.plugin('contentToHtml', {
   afterFind: (posts) => {
       return posts.map((post) => {
           post.content = marked(post.content);
           return post;
       });
   } ,
    afterFindOne: (post) => {
       if (post) {
           post.content = marked(post.content);
       }
       return post;
    }
});

module.exports = {
    create: (post) => {
        return Post
            .create(post)
            .exec();
    },
    getPostById:  (postId) => {
        return Post
            .findOne({ _id: postId })
            .populate({ path: 'author', model: 'User' })
            .addCreatedAt()
            .addCommentsCount()
            .contentToHtml()
            .exec();
    },
    getPosts:  (author) => {
        let query = {};
        if (author) {
            query.author = author;
        }
        return Post
            .find(query)
            .populate({ path: 'author', model: 'User' })
            .sort({ _id: -1 })
            .addCreatedAt()
            .addCommentsCount()
            .contentToHtml()
            .exec();
    },
    incPv:  (postId) => {
        return Post
            .update({ _id: postId }, { $inc: { pv: 1 } })
            .exec();
    },
    getRawPostById:  (postId) => {
        return Post
            .findOne({ _id: postId })
            .populate({ path: 'author', model: 'User' })
            .exec();
    },
    updatePostById:  (postId, author, data) => {
        return Post
            .update({ author: author, _id: postId }, { $set: data })
            .exec();
    },
    delPostById:  (postId, author) => {
        return Post
            .remove({ author: author, _id: postId })
            .exec()
            .then( (res) => {
                if (res.result.ok && res.result.n > 0) {
                    return CommentModel
                        .delCommentsByPostId(postId);
                }
            });
    }
};