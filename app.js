var http = require('http');
var sys = require('sys');
var exec = require('child_process').exec;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  function puts(error, stdout, stderr) { sys.puts(stdout) }
  exec("node -v", puts);
  res.end('Hello World\n');
}).listen(8000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8000/');
