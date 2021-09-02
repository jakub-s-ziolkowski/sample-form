'use strict';

import http from 'http';

import * as signController from './app/signController.js';
import { getFile } from './app/getFile.js';

http.createServer((req, res) => {

    if (req.url == '/sign') signController.receiveData(req, res);

    else {

        let relativePath;

        switch (req.url) {

            case '/': relativePath = '/public/index.html'; break;
            case '/inputs': relativePath = '/inputs-config.json'; break;
            default: relativePath = req.url; break;
        }

        const filePath = process.env.PWD + relativePath,
              extensionName = relativePath.split('.').pop();

        getFile(
            filePath,
            content => {

                let contentType;

                switch (extensionName) {

                    case 'html': contentType = 'text/html'; break;
                    case 'css': contentType = 'text/css'; break;
                    case 'js': contentType = 'text/javascript'; break;
                    case 'json': contentType = 'application/json'; break;
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
