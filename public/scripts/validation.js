'use strict';

export const validateForm = form =>

    form.addEventListener('submit', event => {

        event.preventDefault();

        let valid = true;
        const data = {};

        document.querySelectorAll('.form__input').forEach(element => {

            const value = element.value;

            switch (element.type) {

                case 'text':

                    if (!value.match(new RegExp(/^[a-zA-Z]+$/)))
                        element.classList.add('form__input--incorrect'),
                        valid = false;

                    break;

                case 'email':

                    if (!value.match(new RegExp(/^\S+@\S+$/)))
                        element.classList.add('form__input--incorrect'),
                        valid = false;

                    break;

                case 'password':

                    if (!value.match(new RegExp(/^\S{8,}$/)))
                        element.classList.add('form__input--incorrect'),
                        valid = false;

                    break;
            }

            if (valid) data[element.id] = value;
        });

        if (valid) {

            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'sign');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    });
