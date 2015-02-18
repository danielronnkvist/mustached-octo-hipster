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
    fs.readdir(__dirname+'/pictures', function(err, images) {
      if (err)
        console.error(err);
      console.log(images.length, " number of images in folder")
      var s = "gm montage -geometry 2048x1300 ";
      for(var i = 0; i < 3; i++){
        console.log(images[i]);
        s += images[i] + " ";
      }
      var filename = photos.length + ".jpg";
      photos.push(filename);
      s += "pictures/"+filename;
      console.log(s);
      exec(s, function(err, stdout, stderr){
        return res.end(filename)
      });
    });
  }
  exec("gphoto2 -I 1 -F 3 --capture-image-and-download --filename pictures/%Y%m%d%H%M%S.%C", puts);
});

var server = app.listen(8000, function() {
  function puts(error, stdout, stderr) {
    console.log(stdout);
  }
  exec("gphoto2 --auto-detect", puts);
  console.log("Listening on port %d", server.address().port);
});

