//Created by xuchao on 2017/1/6.
let express = require('express');
let router = express.Router();

let PostModel = require('../models/posts');
let checkLogin = require('../middlewares/check').checkLogin;

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/',  (req, res, next) => {
    res.render('post');
});

// POST /posts 发表一篇文章
router.get('/create', checkLogin,  (req, res, next) => {
    res.render('create');
});

// GET /posts/create 发表文章页
router.post('/', checkLogin,  (req, res, next) => {
    let author = req.session.user._id;
    let title = req.fields.title;
    let content = req.fields.content;

    try {
        if(!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw  new Error('请填写内容');
        }
    }catch (e) {
        req.flash('error',e.message);
        return res.redirect('back');
    }

    let post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    };

    PostModel.create(post)
        .then((result) => {
        post = result.op[0];
        req.flash('success','发表成功');
        res.redirect(`/post/${post._id}`);
        })
        .catch(next);
});

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId',  (req, res, next) => {
    res.send(req.flash());
});

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin,  (req, res, next) => {
    res.send(req.flash());
});

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin,  (req, res, next) => {
    res.send(req.flash());
});

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin,  (req, res, next) => {
    res.send(req.flash());
});

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin,  (req, res, next) => {
    res.send(req.flash());
});

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin,  (req, res, next) => {
    res.send(req.flash());
});

module.exports = router;