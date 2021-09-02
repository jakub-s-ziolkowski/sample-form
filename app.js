'use strict';

import http from 'http';
import sass from 'sass';

import * as signController from './app/signController.js';
import { getFile } from './app/getFile.js';

http.createServer((req, res) => {

    if (req.url == '/sign') signController.receiveData(req, res);

    else if (req.url == '/inputs')
        getFile(
            process.env.PWD + '/inputs-config.json',
            content => {

                res.writeHead(200, {'Content-type': 'application/json; charset = utf-8'});
                res.end(content);
            },
            error => {

                res.setHeader('Content-Type', 'text/plain');
                res.end(`Error ${error}`);
            });

    else {

        const filePath = process.env.PWD + (req.url === '/' ? '/public/index.html' : req.url);
        const extensionName = filePath.split('.').pop();

        if (extensionName === 'scss') {

            sass.render({file: filePath},
                (error, result) => {

                    if (error) console.error(error.message);

                    else {

                        res.writeHead(200, {'Content-type': 'text/css; charset = utf-8'});
                        res.end(result.css.toString());
                    }
                });
        }

        else getFile(
            filePath,
            content => {

                let contentType;

                switch (extensionName) {

                    case 'html': contentType = 'text/html'; break;
                    case 'css': contentType = 'text/css'; break;
                    case 'js': contentType = 'text/javascript'; break;
                    case 'svg': contentType = 'image/svg+xml'; break;
                }

                res.writeHead(200, {'Content-type': `${contentType}; charset = utf-8`});
                res.end(content);
            },
            error => {

                res.setHeader('Content-Type', 'text/plain');
                res.end(`Error ${error}`);
            });
    }

}).listen(process.env.PORT);
