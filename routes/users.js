//Created by xuchao on 2017/1/5.
let express = require('express');
let router = express.Router();

router.get('/:name',(req, res, next) => {
    res.send('GG ' +
        req.params.name);
});

module.exports = router;