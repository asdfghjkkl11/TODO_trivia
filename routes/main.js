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
  store: new FileStore(),
  cookie:{
    maxAge: 60*60*1000
  }
}));
router.use(bodyParser.urlencoded({extended: true}));
//check session whether user already login and go to /
//if session exist, load data from ListRealm
router.get('/', function(req, res, next) {
  let list=[];
  if(req.session.Id!=null){
    //list find
    list=ListRealm.objects('List').filtered(
      'user= "'+req.session.Id+'"'
    );
  }
  res.render('main', { title: 'TODO_trivia' ,err:'', Id:req.session.Id, nickname:req.session.nickname, data:list});
});
//check user login, load todo-list
/*
  if session dosen't exist, back to /login
  else, laod data from ListRealm go to /
*/
router.post('/', function(req, res, next) {
  //user find
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
      //list find
      list=ListRealm.objects('List').filtered(
        'user= "'+req.session.Id+'"'
      );
    }
    res.render('main', { title: 'TODO_trivia',err:'', Id:req.session.Id, nickname:req.session.nickname,data:list});
  }
});
module.exports = router;
