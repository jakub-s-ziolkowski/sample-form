import fs from 'fs';

export const getFile = (fileName, success, failure) =>
    new Promise((resolve, reject) =>
        fs.readFile(fileName, (error, content) => {

            if (!error && content) resolve(content);
            else reject(error);
        })
    )
    .then(content => success(content))
    .catch(error => failure(error));
