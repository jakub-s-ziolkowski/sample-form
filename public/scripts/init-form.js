'use strict';

import { changeForm } from './change-form.js';
import { createInputs } from './create-inputs.js';
import { validateForm } from './validate-form.js';

export const initForm = frame => {

    const form = frame.querySelector('.form'),
          trigger = frame.querySelector('.frame__trigger');

    createInputs(form, false);
    validateForm(form);

    frame.classList.remove('frame--invisible');

    const fade = () => {

        trigger.removeEventListener('click', fade);

        frame.classList.add('frame--invisible');

        setTimeout(() => {

            frame.classList.add('frame--hidden');
            changeForm(frame);
            frame.classList.remove('frame--invisible', 'frame--hidden');
            trigger.addEventListener('click', fade);
        }, 500);
    };

    trigger.addEventListener('click', fade);
};
