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

    const path = __dirname + (req.url === '/' ? '/public/index.html' : req.url);

    if (req.url == '/sign') {

        let data = '';

        req.on('data', chunk => {

            data += chunk;

            if (data.length > 1e6) {

                res.writeHead(413, {'Content-Type': 'text/plain', 'Connection': 'close'});
                res.end();
                req.destroy();
            }
        });
        req.on('end', () => {

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end();
        });
    }

    else getFile(path)
        .then(content => {

            const extensionName = path.split('.').pop();
            let contentType;

            switch (extensionName) {

                case 'html': contentType = 'text/html'; break;
                case 'css': contentType = 'text/css'; break;
                case 'js': contentType = 'text/javascript'; break;
            }

            res.writeHead(200, {'Content-type': `${contentType}; charset = utf-8`});
            res.end(content);
        })
        .catch(error => {

            res.setHeader('Content-Type', 'text/plain');
            res.end(`Error ${error}`);
        });

}).listen(3000, '127.0.0.1');
