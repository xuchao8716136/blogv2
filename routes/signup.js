//Created by xuchao on 2017/1/6.
let fs = require('fs');
let path = require('path');
let sha1 = require('sha1');
let express = require('express');
let router = express.Router();

let UserModel = require('../models/users');
let checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', checkNotLogin, (req, res, next) => {
    res.render('signup');
});

// POST /signup 用户注册
router.post('/', checkNotLogin, (req, res, next) => {
    let name = req.fields.name,
        gender = req.fields.gender,
        bio = req.fields.bio,
        avatar = req.files.avatar.path.split(path.sep).pop(),
        password = req.fields.password,
        repassword = req.fields.repassword;
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是 m、f 或 x');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (!req.files.avatar.name) {
            throw new Error('缺少头像');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        fs.unlink(req.files.avatar.path);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }
    password = sha1(password);

    let user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    };

    UserModel.create(user)
        .then((result) => {
            user = result.ops[0];
            delete user.password;
            req.session.user = user;
            req.flash('success', '注册成功');
            res.redirect('/posts');
        })
        .catch((e) => {
            fs.unlink(req.files.avatar.path);
            if (e.message.match('E11000 duplicate key')) {
                req.flash('error', '用户名已被占用');
                return res.redirect('/signup');
            }
            next(e);
        });
});
module.exports = router;