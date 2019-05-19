var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var UserRealm= require('./user');
router.use(bodyParser.urlencoded({extended: true}));
//check address shouldn't access get
router.get('/', function(req, res, next) {
  res.render('login', { title: 'TODO_trivia',err:'wrong access' });
});
//check UserRealm whether user_id already exist
/*
  if sign up success, go to /login
  else, back to /sign
*/
router.post('/', function(req, res, next) {
  let user=UserRealm.objects('User').filtered(
    'Id= "'+req.body['user_id']+'"');
  if(user.length==0){
    //user create
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
