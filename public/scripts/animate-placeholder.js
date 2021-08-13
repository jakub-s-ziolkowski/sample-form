'use strict';

export const animatePlaceholder = (element, duration) => {

    const applyAnimation = event => {

        if (!element.value) {

            const inputLabel =  element.parentElement.querySelector('.form__label');

            inputLabel.classList.add('form__label--transition');
            inputLabel.classList[event.type === 'blur' ? 'remove' : 'add']('form__label--active');

            window.setTimeout(() => inputLabel.classList.remove('form__label--transition'), duration);
        }
    };

    element.addEventListener('focus', applyAnimation);
    element.addEventListener('blur', applyAnimation);
};
