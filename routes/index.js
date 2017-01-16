//Created by xuchao on 2017/1/5.
module.exports =  (app) => {
    app.get('/', (req, res) => {
        res.redirect('/posts')
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/semanticui', require('./semanticui'));
    app.use('/menu', require('./menu'));
    app.use('/posts', require('./posts'));
};