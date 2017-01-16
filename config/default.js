//Created by xuchao on 2017/1/5.
module.exports = {
    port: 3000, //端口号
    session: {   //express session 配置
        secret: 'blogv2',
        key: 'blogv2',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/blogv2' //数据库地址
};