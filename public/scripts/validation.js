'use strict';

export const validateForm = form =>

    form.addEventListener('submit', event => {

        event.preventDefault();

        let valid = true;
        const data = {};

        document.querySelectorAll('.form__input').forEach(element => {

            const value = element.value,
                  parent = element.parentElement;

            const message = parent.querySelector('.form__message');

            let regexp;

            switch (element.type) {

                case 'text':
                    regexp = /^[a-zA-Z]+$/;
                    break;

                case 'email':
                    regexp = /^\S+@\S+$/;
                    break;

                case 'password':
                    regexp = /^\S{8,}$/;
                    break;

            }

            const applyClass = className => {

                if (!parent.classList.contains(className)) {

                    parent.classList.add(className);

                    element.addEventListener('focus', () => parent.classList.remove(className));
                    element.addEventListener('input', () => parent.classList.remove(className));
                }
            };

            if (!value.match(regexp)) {

                applyClass('form__field--incorrect');

                message.innerText = 'Incorrect ' + element.name;

                valid = false;
            }

            else {

                applyClass('form__field--correct');

                message.innerText = '';

                data[element.id] = value;
            }
        });

        if (valid) {

            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'sign');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    });
