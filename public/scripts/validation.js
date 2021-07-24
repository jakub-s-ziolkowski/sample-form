'use strict';

export const validateForm = form =>

    form.addEventListener('submit', event => {

        event.preventDefault();

        let valid = true;
        const data = {};

        document.querySelectorAll('.form__input').forEach(element => {

            const value = element.value,
                  parent = element.parentElement;

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

            if (!value.match(regexp)) {

                if (!parent.classList.contains('form__field--incorrect')) {

                    parent.classList.add('form__field--incorrect');

                    element.addEventListener('focus', () => parent.classList.remove('form__field--incorrect'));
                    element.addEventListener('input', () => parent.classList.remove('form__field--incorrect'));
                }

                valid = false;
            }

            else {

                if (!parent.classList.contains('form__field--correct')) {

                    parent.classList.add('form__field--correct');

                    element.addEventListener('focus', () => parent.classList.remove('form__field--correct'));
                    element.addEventListener('input', () => parent.classList.remove('form__field--correct'));
                }

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
