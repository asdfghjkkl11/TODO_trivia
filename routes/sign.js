var express = require('express');
var router = express.Router();

//sign address 
router.get('/', function(req, res, next) {
  res.render('sign', { title: 'TODO_trivia',err:'' });
});
//sign address shouldn't access post
router.post('/', function(req, res, next) {
  res.render('sign', { title: 'TODO_trivia',err:'wrong access' });
});
module.exports = router;
