const http = require('http'),
  url = require('url'),
  fs = require('fs');

http.createServer((request, response) => {
    let addr = request.url;
    let q = new URL(addr, 'http://' + request.headers.host), //parsed URL from user
      filePath = '';

    fs.appendFile(
      'log.txt',
      'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n',
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Added to log.'); //add server requests to log.txt
        }
      }
    );

    if (q.pathname.includes('documentation')) {
      filePath = (__dirname + '/documentation.html');
    } else {
      filePath = 'index.html'; //redirect all other pathnames to index.html
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
  }).listen(8080);
console.log('My test server is running on Port 8080.');