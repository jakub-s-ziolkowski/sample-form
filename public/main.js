'use strict';

import { animatePlaceholderAll } from './scripts/placeholder-animation.js'
import { animateForm } from './scripts/form-change-animation.js';
import { validateForm } from './scripts/validation.js';

animatePlaceholderAll(document.querySelectorAll('.form__input'));
animateForm(document.querySelector('.frame__trigger'));
validateForm(document.querySelector('.form'));
