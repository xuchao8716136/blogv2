//Created by xuchao on 2017/1/6.
let sha1 =require('sha1');
let express = require('express');
let router = express.Router();

// 判断没有登录，则进入登录页
let UserModel = require('../models/users');
let checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin,  (req, res, next) => {
    res.render('signin');
});

// POST /signin 用户登录
router.post('/', checkNotLogin, (req, res, next) => {
    let name = req.fields.name;
    let password = req.fields.password;

    UserModel.getUserByName(name)
        .then((user) => {
        if(!user) {
            req.flash('error','用户不存在');
            return res.redirect('back');
        }
        if(sha1(password) !== user.password){
            req.flash('error','用户名或密码错误');
            return res.redirect('back');
        }
        req.flash('success','登录成功');
        delete user.password;
        req.session.user = user;
        res.redirect('/posts');
        })
        .catch(next);
});

module.exports = router;