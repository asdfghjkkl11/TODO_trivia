var express = require('express');
var fs = require('fs');
var router = express.Router();
//sign address
router.get('/', function(req, res, next) {
  fs.readFile('bg.png',function(error,data){
    res.writeHead(200,{'Content-Type':'img/png'});
    res.write(data);
    res.end();
  });
});
//bg address shouldn't access post
router.post('/', function(req, res, next) {
  let list=[];
  res.render('main', { title: 'TODO_trivia',err:'not login', Id:"", nickname:"" , data:list});
});
module.exports = router;
