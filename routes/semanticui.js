//Created by xuchao on 2017/1/11.
let express = require('express');
let router = express.Router();

// let checkNotLogin = require('../middlewares/check').checkNotLogin;

// semantic ui apis
router.get('/', (req, res, next) => {
    res.render('semanticui');
});

module.exports = router;