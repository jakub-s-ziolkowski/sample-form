'use strict';

import animatePlaceholder from './placeholder-animation.js'

export const animateForm = trigger =>

    trigger.addEventListener('click', () => {

        const frame = document.querySelector('.frame');

        frame.classList.add('frame--transition');

        setTimeout(() => {

            const form = document.querySelector('.form');

            if (form.dataset.type === 'in') {

                const createField = name => {

                    const input = document.createElement('input');
                    input.classList.add('form__input');
                    input.id = name;
                    input.type = 'text';
                    input.name = name;

                    const label = document.createElement('label');
                    label.appendChild(document.createTextNode(name));
                    label.classList.add('form__label');
                    label.htmlFor = 'name';

                    const span = document.createElement('span');
                    span.classList.add('form__message');

                    const field = document.createElement('div');
                    field.classList.add('form__field');
                    field.appendChild(label);
                    field.appendChild(input);
                    field.appendChild(span);

                    return field;
                };

                const nameField = createField("name"),
                      surnameField = createField("surname");

                animatePlaceholder(nameField.querySelector('.form__input'));
                animatePlaceholder(surnameField.querySelector('.form__input'));

                form.insertBefore(surnameField, document.querySelector('.form__field'));
                form.insertBefore(nameField, surnameField);

                trigger.title = 'Log in';

                form.dataset.type = 'out';
            }

            else if (form.dataset.type === 'out') {

                form.removeChild(form.querySelector('.form__field'));
                form.removeChild(form.querySelector('.form__field'));

                trigger.title = 'Create an account';

                form.dataset.type = 'in';
            }

            const button = document.querySelector('.form__button');
            const buttonLabel = button.innerText.split(' ');
            button.innerText = buttonLabel[0] + (buttonLabel[1] === 'in' ? ' up' : ' in');

            const triggerLabel = trigger.innerText.split(' ');
            trigger.innerText = (triggerLabel[0] === 'Not' ? 'Already ' : 'Not ') + triggerLabel[1];

            frame.classList.remove('frame--transition');

        }, 900);
    });
