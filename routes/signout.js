//Created by xuchao on 2017/1/6.
let express = require('express');
let router = express.Router();

let checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, (req, res, next) => {
    req.session.user = null;
    req.flash('success','登出成功');
    res.redirect('/posts');
});

module.exports = router;