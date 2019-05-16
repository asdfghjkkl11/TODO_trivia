var express = require('express');
var router = express.Router();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
router.use(session({
  secret: '30q85ryhj3n9',
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
  cookie:{
    maxAge: 60*60*1000
  }
}));
//delete session and go to /
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('main', { title: 'TODO_trivia',err:'', Id:'',nickname:'' ,data:[]});
});
//logout address shouldn't access post
router.post('/', function(req, res, next) {
  res.render('login', { title: 'TODO_trivia',err:'wrong access' });
});
module.exports = router;
