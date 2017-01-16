//Created by xuchao on 2017/1/16.
let Post = require('../lib/mongo').Post;
// 存放代码
module.exports = {
    create: (post) => {
        return Post.create(post).exec();
    }
};