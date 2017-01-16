//Created by xuchao on 2017/1/6.
let express = require('express');
let router = express.Router();

let checkLogin = require('../middlewares/check').checkLogin;

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx
router.get('/',  (req, res, next) => {
    res.render('post');
});

// POST /posts 发表一篇文章
router.post('/', checkLogin,  (req, res, next) => {
    res.send(req.flash());
});

// GET /posts/create 发表文章页
router.get('/create', checkLogin,  (req, res, next) => {
    res.send(req.flash());
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