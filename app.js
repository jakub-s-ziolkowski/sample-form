'use strict';

import http from 'http';
import fs from 'fs';
import p from 'path';

const path = p.resolve();

const getFile = fileName =>
    new Promise((resolve, reject) =>
        fs.readFile(fileName, (error, content) => {

            if (!error && content) resolve(content);
            else reject(error);
        })
    );

http.createServer((req, res) => {

    if (req.url == '/sign') {

        let data = '';

        req.on('data', chunk => {

            data += chunk;

            if (data.length > 1e6) {

                res.writeHead(413, {'Content-Type': 'text/plain; charset = utf-8', 'Connection': 'close'});
                res.end();
                req.destroy();
            }
        });
        req.on('end', () => {

            res.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8'});
            res.end();
        });
    }

    else if (req.url == '/inputs')
        getFile(path + '/settings.json')
            .then(content => {

                res.writeHead(200, {'Content-type': 'application/json; charset = utf-8'});
                res.end(content);
            })
            .catch(error => {

                res.setHeader('Content-Type', 'text/plain');
                res.end(`Error ${error}`);
            });

    else {

        const filePath = path + (req.url === '/' ? '/public/index.html' : req.url);

        getFile(filePath)
            .then(content => {

                const extensionName = filePath.split('.').pop();
                let contentType;

                switch (extensionName) {

                    case 'html': contentType = 'text/html'; break;
                    case 'css': contentType = 'text/css'; break;
                    case 'js': contentType = 'text/javascript'; break;
                    case 'svg': contentType = 'image/svg+xml'; break;
                }

                res.writeHead(200, {'Content-type': `${contentType}; charset = utf-8`});
                res.end(content);
            })
            .catch(error => {

                res.setHeader('Content-Type', 'text/plain');
                res.end(`Error ${error}`);
            });
    }

}).listen(3000, '127.0.0.1');
