//Created by xuchao on 2017/1/12.
let express = require('express');
let router = express.Router();


router.get('/', (req, res, next) => {
    res.render('menu');
});


module.exports = router;