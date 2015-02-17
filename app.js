var http = require('http');
var sys = require('sys');
var exec = require('child_process').exec;
var express = require('express')
var app = express();
var ejs = require('ejs');

app.engine('html', ejs.renderFile);

app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/photo', function(req,res){
  function puts(error, stdout, stderr) { sys.puts(stdout); }
  exec("node -v", puts);
});

var server = app.listen(8000, function() {
  console.log("Listening on port %d", server.address().port);
});

