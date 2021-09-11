'use strict';

export const receiveData = (req, res, action) =>
    new Promise((resolve, reject) => {

        let data = '';

        req.on('data', chunk => {

            data += chunk;

            if (data.length > 1e6) {

                res.writeHead(413, {'Content-Type': 'text/plain; charset = utf-8', 'Connection': 'close'});
                res.end();
                req.destroy();

                reject('Payload too large');
            }
        });
        req.on('end', () => {

            res.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8'});
            res.end();

            resolve(data);
        });
    })
    .then(content => action(content))
    .catch(error => console.error(error));
