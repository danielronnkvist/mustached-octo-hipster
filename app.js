var http = require('http');
var exec = require('child_process').exec;
var express = require('express')
var app = express();
var ejs = require('ejs');

app.engine('html', ejs.renderFile);
// Static folder with resources
app.use(express.static(__dirname));

app.get('/', function(req, res){
  res.render('index.html');
});


app.get('/photo', function(req,res){
  function puts(error, stdout, stderr) {
    console.log(stdout);
    return res.end("DATA")
  }
  exec("gphoto2 --capture-image-and-download", puts);
});

var server = app.listen(8000, function() {
  function puts(error, stdout, stderr) {
    console.log(stdout);
  }
  exec("gphoto2 --auto-detect", puts);
  console.log("Listening on port %d", server.address().port);
});

