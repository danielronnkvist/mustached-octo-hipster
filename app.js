var http = require('http');
var exec = require('child_process').exec;
var express = require('express')
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var photos = [];

app.engine('html', ejs.renderFile);
// Static folder with resources
app.use(express.static(__dirname+"/results"));

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
      if (!images)
	images = [];
      console.log(images.length, " number of images in folder")
      var s = "gm montage -geometry 333x221 ";
      for(var i = images.length-1; i > images.length-4; i--){
        console.log(images[i]);
        s += __dirname + "/pictures/" + images[i] + " ";
      }
      if (!photos)
        var filename = "0.jpg";
      else
	var filename = photos.length + ".jpg";
      photos.push(filename);
      s += __dirname + "/results/"+filename;
      console.log(s);
      exec(s, function(err, stdout, stderr){
        return res.end(filename)
      });
    });
  }
  exec("gphoto2 -I 1 -F 3 --capture-image-and-download --filename "+__dirname+"/pictures/%Y%m%d%H%M%S.%C", puts);
});

var server = app.listen(8000, function() {
  function puts(error, stdout, stderr) {
    console.log(stdout);
  }
  exec("gphoto2 --auto-detect", puts);
  console.log("Listening on port %d", server.address().port);
});

