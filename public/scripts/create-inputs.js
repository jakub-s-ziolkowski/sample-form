'use strict';

import { animatePlaceholder } from "./animate-placeholder.js";

export const createInputs = (form, type) =>
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
    .then(data => {

        const button = form.querySelector('.form__button');

        data.forEach(element => {

            if (type >= element.registrationOnly) {

                const label = document.createElement('label');
                label.appendChild(document.createTextNode(element.name));
                label.classList.add('form__label');
                label.setAttribute('for', element.name);

                const input = document.createElement('input');
                input.classList.add('form__input');
                input.setAttribute('id', element.name);
                input.setAttribute('name', element.name);
                input.setAttribute('type', element.type);
                input.setAttribute(
                    'autocomplete',
                    element.autoComplete.includes('/') ?
                        element.autoComplete.split('-')[0].split('/')[type ? 1 : 0] + '-' + element.autoComplete.split('-')[1] :
                        element.autoComplete);

                animatePlaceholder(input, 450);

                const span = document.createElement('span');
                span.classList.add('form__message');

                const div = document.createElement('div');
                div.classList.add('form__field');
                div.appendChild(label);
                div.appendChild(input);
                div.appendChild(span);

                form.insertBefore(div, button);
            }
        });
    })
    .catch(error => console.error(error.statusText));
