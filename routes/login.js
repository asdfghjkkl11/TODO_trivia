var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.Id!=null)
    res.render('main', { title: 'TODO_trivia',err:'already login' });
  else
    res.render('login', { title: 'TODO_trivia',err:'' });
});
router.post('/', function(req, res, next) {
  res.render('login', { title: 'TODO_trivia',err:'' });
});
module.exports = router;
