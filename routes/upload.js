var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ListRealm= require('./list');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
process.setMaxListeners(15);
router.use(session({
  secret: '30q85ryhj3n9',
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
  cookie:{
    maxAge: 60*60*1000
  }
}));
//upload address shouldn't access get
router.get('/', function(req, res, next) {
  let list=[];
  if(req.session.Id!=null)
    res.render('main', { title: 'TODO_trivia',err:'wrong access', Id:req.session.Id, nickname:req.session.nickname, data:list });
  else
    res.render('main', { title: 'TODO_trivia',err:'wrong access', Id:"", nickname:"" , data:list});
});
//check user login, reload todo-list
/*
  if session dosen't exist, back to /login
  else, delete exist list data and resave data
  finally back to / reload data
*/
router.post('/', function(req, res, next) {
  let list=[];
  if(req.session.Id!=null){
    //list find
    list=ListRealm.objects('List').filtered(
      'user= "'+req.session.Id+'"'
    );
    ListRealm.write(() => {
      //list delete
      ListRealm.delete(list);
      if(req.body['title'].length!=0){
        let title=req.body['title'].split(',');
        let content=req.body['content'].split(',');
        let success=req.body['success'].split(',');
        let check=req.body['check'].split(',');
        let todo=req.body['todo'].split(',');
        let leng=title.length;
        //list create
        for(let i = 0;i < leng; i++){
          ListRealm.create('List', {
            user: req.body['user'],
            timestamp: req.body['timestamp'],
            title: String(title[i]),
            content: String(content[i]),
            success: String(success[i]),
            check: String(check[i]),
            todo: String(todo[i])
          });
        }
      }
    });
    //list find
    list=ListRealm.objects('List').filtered(
      'user= "'+req.body['user']+'"'
    );
    res.render('main', { title: 'TODO_trivia',err:'', Id:req.session.Id, nickname:req.session.nickname, data:list });
  }else
    res.render('main', { title: 'TODO_trivia',err:'not login', Id:"", nickname:"" , data:list});
});
module.exports = router;
