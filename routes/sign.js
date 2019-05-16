var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign', { title: 'TODO_trivia',err:'' });
});
router.post('/', function(req, res, next) {
  res.render('sign', { title: 'TODO_trivia',err:'wrong access' });
});
module.exports = router;
