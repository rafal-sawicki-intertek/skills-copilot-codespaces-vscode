// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var comments = [];

var server = http.createServer(function(request, response) {
  var path = url.parse(request.url).pathname;

  switch (path) {
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();
      break;
    case '/comments':
      if (request.method === 'POST') {
        var body = '';
        request.on('data', function(data) {
          body += data;
        });
        request.on('end', function() {
          var params = qs.parse(body);
          comments.push(params.comment);
          response.writeHead(200, {'Content-Type': 'text/plain'});
          response.write('Comment received');
          response.end();
        });
      } else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(comments.join('\n'));
        response.end();
      }
      break;
    default:
      response.writeHead(404);
      response.write('Not Found');
      response.end();
      break;
  }
});

server.listen(8000);
console.log('Server running at http://localhost:8000/');
