//Created by xuchao on 2017/1/13.
let User = require('../lib/mongo').User;

module.exports = {
    create: (user) => {
        return User.create(user).exec();
    },
    getUserByName: (name) => {
        return User
            .findOne({name: name})
            .addCreatedAt()
            .exec();
    }
};