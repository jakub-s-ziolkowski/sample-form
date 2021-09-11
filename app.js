'use strict';

import http from 'http';
import fs from 'fs';

import * as signController from './app/signController.js';

http.createServer((req, res) => {

    if (req.url == '/sign-in') signController.signIn(req, res);
    else if (req.url == '/sign-up') signController.signUp(req, res);

    else {

        let relativePath;

        switch (req.url) {

            case '/': relativePath = '/public/index.html'; break;
            case '/inputs': relativePath = '/inputs-config.json'; break;
            default: relativePath = req.url; break;
        }

        const filePath = process.env.PWD + relativePath,
              extensionName = relativePath.split('.').pop();

        new Promise((resolve, reject) =>
            fs.readFile(filePath, (error, content) => {

                if (!error && content) resolve(content);
                else reject(error);
            })
        )
        .then(content => {

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
        })
        .catch(error => {

            res.setHeader('Content-Type', 'text/plain');
            res.end(`Error ${error}`);
        });

    }

}).listen(process.env.PORT);
