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
  store: new FileStore()
}));
/* GET home page. */
router.get('/', function(req, res, next) {
  let list=[];
  if(req.session.Id!=null)
    res.render('main', { title: 'TODO_trivia',err:'wrong access', Id:req.session.Id, nickname:req.session.nickname, data:list });
  else
    res.render('main', { title: 'TODO_trivia',err:'wrong access', Id:"", nickname:"" , data:list});
});
router.post('/', function(req, res, next) {
  let list=[];
  if(req.session.Id!=null){
    list=ListRealm.objects('List').filtered(
      'user= "'+req.session.Id+'"'
    );
    ListRealm.write(() => {
      ListRealm.delete(list);
      let leng=req.body['title'].length;
      for(let i = 0;i < leng; i++){
        console.log(req.body['todo']);
        ListRealm.create('List', {
          user: req.body['user'],
          timestamp: req.body['timestamp'],
          title: req.body['title'],
          content: req.body['content'],
          success: req.body['success'],
          check: req.body['check'],
          todo: req.body['todo']
        });
      }
    });
    list=ListRealm.objects('List').filtered(
      'user= "'+req.body['user']+'"'
    );
    console.log(list);
    res.render('main', { title: 'TODO_trivia',err:'', Id:req.session.Id, nickname:req.session.nickname, data:list });
  }else
    res.render('main', { title: 'TODO_trivia',err:'not login', Id:"", nickname:"" , data:list});
});
module.exports = router;
