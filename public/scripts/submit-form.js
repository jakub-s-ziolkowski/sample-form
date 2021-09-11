'use strict';

export const submitForm = (data, formType) => {

    const xhr = new XMLHttpRequest();

    xhr.open('POST', `sign-${formType}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
};
