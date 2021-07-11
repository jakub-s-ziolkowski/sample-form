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

document.querySelector('button').addEventListener('click', event => event.preventDefault());

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

            form.dataset.type = 'out';
        }

        else if (form.dataset.type === 'out') {

            form.removeChild(form.querySelector('.form__field'));
            form.removeChild(form.querySelector('.form__field'));

            form.dataset.type = 'in';
        }

        const button = document.querySelector('.form__button');
        const buttonLabel = button.innerText.split(' ');
        button.innerText = buttonLabel[0] + (buttonLabel[1] === 'in' ? ' up' : ' in');

        const triggerLabel = trigger.innerText.split(' ');
        trigger.innerText = (triggerLabel[0] === 'Not' ? 'Already ' : 'Not ') + triggerLabel[1];

        frame.classList.remove('frame--transition');

    }, 1000);
});
