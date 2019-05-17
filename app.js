var express = require('express');
var path = require('path');
var main = require('./routes/main');
var login = require('./routes/login');
var logout = require('./routes/logout');
var sign = require('./routes/sign');
var upload = require('./routes/upload');
var check = require('./routes/check');
var bg = require('./routes/bg');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/node_modules',express.static(path.join(__dirname,'/node_modules')));
app.use('/static', express.static(__dirname + '/public'));
app.use('/', main);
app.use('/login', login);
app.use('/logout', logout);
app.use('/sign',sign);
app.use('/upload', upload);
app.use('/check',check);
app.use('/bg',bg);
app.listen(3000, function() {
  console.log("Connect!");
});
