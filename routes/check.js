var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var UserRealm= require('./user');
router.use(bodyParser.urlencoded({extended: true}));
router.get('/', function(req, res, next) {
  res.render('login', { title: 'TODO_trivia',err:'wrong access' });
});
router.post('/', function(req, res, next) {
  let user=UserRealm.objects('User').filtered(
    'Id= "'+req.body['user_id']+'"');
  if(user.length==0){
    UserRealm.write(() => {
      UserRealm.create('User', {
        Id:req.body['user_id'],
        name: req.body['user_nickname'],
        password: req.body['user_pwd']
      });
    });
    res.render('login', { title: 'TODO_trivia',err:'' });
  }else{
    res.render('sign', { title: 'TODO_trivia',err:'already exist' });
  }
});
module.exports = router;
