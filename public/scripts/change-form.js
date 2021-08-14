'use strict';

import { createInputs } from './create-inputs.js';

export const changeForm = frame => {

    const trigger = frame.querySelector('.frame__trigger');
    const form = frame.querySelector('.form');
    const button = form.querySelector('.form__button');

    form.querySelectorAll('.form__field').forEach(element => form.removeChild(element));

    const formType = form.getAttribute('data-type') === 'in';

    createInputs(form, formType);

    if (formType) {

        form.setAttribute('data-type', 'up');
        trigger.setAttribute('title', 'Log in');
        trigger.textContent = 'Already registered?';
        button.textContent = 'Sign up';
    }

    else {

        form.setAttribute('data-type', 'in');
        trigger.setAttribute('title', 'Create an account');
        trigger.textContent = 'Not registered?';
        button.textContent = 'Sign in';
    }
};
