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
  function puts(error, stdout, stderr) {
    sys.puts(stdout);
  }
  exec("ls", puts);
  exec("gphoto2 --capture-image-and-download", puts);
  exec("ls", puts);
  return res.end("lol")
});

var server = app.listen(8000, function() {
  function puts(error, stdout, stderr) {
    sys.puts(stdout);
  }
  exec("gphoto2 --auto-detect", puts);
  console.log("Listening on port %d", server.address().port);
});

