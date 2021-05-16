'use strict';

const http = require('http'),
      fs = require('fs');

const getFile = fileName =>
    new Promise((resolve, reject) =>
        fs.readFile(fileName, (error, content) => {

            if (!error && content) resolve(content);
            else reject(error);
        })
    );

http.createServer((req, res) => {

    const filePath = __dirname + (req.url === '/' ? '/public/index.html' : req.url);
    const extensionName = filePath.split('.').pop()
    let contentType;

    switch (extensionName) {

        case 'html': contentType = 'text/html'; break;
        case 'css': contentType = 'text/css'; break;
        case 'js': contentType = 'text/javascript'; break;
    }

    getFile(filePath)
        .then(content => {

            res.writeHead(200, {'Content-type': `${contentType}; charset = utf-8`});
            res.end(content);
        })
        .catch(error => {

            res.setHeader('Content-Type', 'text/plain');
            res.end(`Error ${error}`);
        })

}).listen(3000, '127.0.0.1');
