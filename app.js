'use strict';

const http = require('http'),
      fs = require('fs');

const getFile = fileName =>
    new Promise((resolve, reject) =>
        fs.readFile(fileName, 'utf8', (error, data) => {

            if (!error && data) resolve(data);
            else reject(error);
        })
    );

http.createServer((req, res) => {

    getFile('public/index.html')
        .then(html => {

            res.writeHead(200, {'Content-type': 'text/html; charset = utf-8'});
            res.end(html);
        })
        .catch(error => {

            res.setHeader('Content-Type', 'text/plain');
            res.end(`Error ${error}`);
        })

}).listen(3000, '127.0.0.1');
