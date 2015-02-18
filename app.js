var http = require('http');
var exec = require('child_process').exec;
var express = require('express')
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var gm = require('gm');

app.engine('html', ejs.renderFile);
// Static folder with resources
app.use(express.static(__dirname+"/pictures"));

app.get('/', function(req, res){
  res.render('index.html');
});


app.get('/photo', function(req,res){
  function puts(error, stdout, stderr) {
    console.log(stdout);
    // Make some sweeet image magick stuff
    return res.end("DATA")
  }
  exec("gphoto2 --capture-image-and-download --frames 4 --filename pictures/%Y%m%d%H%M%S.%C ", puts);
});

var server = app.listen(8000, function() {
  function puts(error, stdout, stderr) {
    console.log(stdout);
  }
  exec("gphoto2 --auto-detect", puts);
  console.log("Listening on port %d", server.address().port);
});

