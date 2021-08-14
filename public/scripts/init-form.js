'use strict';

import { changeForm } from './change-form.js';
import { createInputs } from './create-inputs.js';

export const initForm = frame => {

    const form = frame.querySelector('.form'),
          trigger = frame.querySelector('.frame__trigger');

    createInputs(form, false);

    trigger.addEventListener('click', () => changeForm(frame));
};
