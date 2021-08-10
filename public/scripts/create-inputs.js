'use strict';

export const createInputs = (form, type) => {

    new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'inputs');
        xhr.responseType = 'json';

        xhr.onload = () => {

            if (xhr.status === 200)
                resolve(xhr.response);

            else reject({

                status: xhr.status,
                statusText: xhr.statusText
            });
        };

        xhr.onerror = () =>
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });

        xhr.send();
    })
    .then(content => console.log(content))
    .catch(error => console.error(error.statusText));

};
