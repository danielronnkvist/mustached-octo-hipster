var http = require('http');
var exec = require('child_process').exec;
var express = require('express')
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var photos = [];

app.engine('html', ejs.renderFile);
// Static folder with resources
app.use(express.static(__dirname+"/pictures"));

app.get('/', function(req, res){
  res.render('index.html');
});


app.get('/photo', function(req,res){
  function puts(error, stdout, stderr) {
    console.log(stdout);
    // Make some sweeet GraphicsMagick stuff
    fs.readdir('/pictures', function(err, images) {
      var s = "gm montage -geometry 2048x1300 ";
      for(var i = 0; i < 3; i++){
        s += images[i] + " ";
      }
      var filename = photos.length + ".jpg";
      photos.push(filename);
      s += "pictures/"+filename;
      exec(s, function(err, stdout, stderr){
        return res.end(filename)
      });
    });
  }
  exec("gphoto2 --capture-image-and-download --frames 3 --filename pictures/%Y%m%d%H%M%S.%C ", puts);
});

var server = app.listen(8000, function() {
  function puts(error, stdout, stderr) {
    console.log(stdout);
  }
  exec("gphoto2 --auto-detect", puts);
  console.log("Listening on port %d", server.address().port);
});

