'use strict';

const activeAnimation = element => {

    const applyAnimation = event => {

        if (!element.value) {

            const inputLabel =  event.path[1].querySelector('.form__label');

            inputLabel.classList.add('form__label--transition');
            inputLabel.classList[event.type === 'focus' ? 'add' : 'remove']('form__label--active');

            window.setTimeout(() => inputLabel.classList.remove('form__label--transition'), 450);
        }
    };

    element.addEventListener('focus', applyAnimation);
    element.addEventListener('blur', applyAnimation);
};

document.querySelectorAll('.form__input').forEach(activeAnimation);

document.querySelector('button').addEventListener('click', event => {

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

        xhr.open('POST', 'qwerty');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }
});

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

    const field = document.createElement('div');
    field.classList.add('form__field');
    field.appendChild(label);
    field.appendChild(input);

    return field;
};

const trigger = document.querySelector('.frame__trigger');

trigger.addEventListener('click', () => {

    const frame = document.querySelector('.frame');

    frame.classList.add('frame--transition');

    setTimeout(() => {

        const form = document.querySelector('.form');

        if (form.dataset.type === 'in') {

            const nameField = createField("name"),
                    surnameField = createField("surname");

            activeAnimation(nameField.querySelector('.form__input'));
            activeAnimation(surnameField.querySelector('.form__input'));

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
