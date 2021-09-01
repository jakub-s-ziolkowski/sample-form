'use strict';

const receiveData = (req, res) => {

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
};

export { receiveData };
