var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var UserRealm= require('./user');
var ListRealm= require('./list');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
router.use(session({
  secret: '30q85ryhj3n9',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}));
router.use(bodyParser.urlencoded({extended: true}));
/* GET home page. */
router.get('/', function(req, res, next) {
  let list=[];
  if(req.session.Id!=null){
    list=ListRealm.objects('List').filtered(
      'user= "'+req.session.Id+'"'
    );
  }
  res.render('main', { title: 'TODO_trivia' ,err:'', Id:req.session.Id, nickname:req.session.nickname, data:list});
});
router.post('/', function(req, res, next) {
  let user=UserRealm.objects('User').filtered(
    'Id= "'+req.body['user_id']+'" AND '+
    'password= "'+req.body['user_pwd']+'"'
  );
  if(user.length==0){
    res.render('login', { title: 'TODO_trivia',err:'don\'t exist' });
  }else{
    req.session.Id=user[0].Id;
    req.session.nickname=user[0].name;
    let list=[];
    if(req.session.Id!=null){
      list=ListRealm.objects('List').filtered(
        'user= "'+req.session.Id+'"'
      );
    }
    console.log(list);
    res.render('main', { title: 'TODO_trivia',err:'', Id:req.session.Id, nickname:req.session.nickname,data:list});
  }
});
module.exports = router;
