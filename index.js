var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  if(filename === './'){
    filename = './index.html'
  }
  console.log(filename)
  fs.readFile(filename,function (err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    if(filename.includes('.js')){
      res.writeHead(200, {"Content-Type": 'text/javascript;charset=UTF-8'})
      res.write(data);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
    }
    return res.end();
  });
}).listen(8080);
