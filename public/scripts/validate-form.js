'use strict';

export const validateForm = form => {

    const validation = event => {

        event.preventDefault();
        form.removeEventListener('submit', validation);

        let valid = true;
        const data = {};

        form.querySelectorAll('.form__input').forEach(element => {

            const value = element.value,
                  parent = element.parentElement,
                  regexp = new RegExp(element.getAttribute('data-regex'));

            const message = parent.querySelector('.form__message');

            const applyClass = isCorrect => {

                if (!isCorrect) {

                    parent.classList.add('form__field--shake');
                    setTimeout(() => parent.classList.remove('form__field--shake'), 250);
                }

                const className = `form__field--${isCorrect ? '' : 'in'}correct`;

                if (!parent.classList.contains(className)) {

                    parent.classList.add(className);

                    const removeClassName = () => {

                        parent.classList.remove(className);

                        element.removeEventListener('focus', removeClassName);

                        setTimeout(() => message.textContent = '', 500);
                    };

                    element.addEventListener('focus', removeClassName);
                }
            };

            if (!value.match(regexp)) {

                applyClass(false);

                message.textContent = 'Incorrect ' + element.getAttribute('name');

                valid = false;
            }

            else {

                applyClass(true);

                data[element.id] = value;
            }
        });

        if (valid) {

            console.log(data);

            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'sign');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }

        form.addEventListener('submit', validation);
    };

    form.addEventListener('submit', validation);
};
