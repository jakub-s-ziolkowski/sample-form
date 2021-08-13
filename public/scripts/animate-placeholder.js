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

    const autocompleteEvent = new CustomEvent('autocomplete');

    const listener = setInterval(() => {

        if (element.parentElement.querySelector('.form__input:-webkit-autofill')) {

            element.dispatchEvent(autocompleteEvent);
            clearInterval(listener);
        }
    }, 50);

    element.addEventListener('blur', applyAnimation);
    element.addEventListener('focus', applyAnimation);
    element.addEventListener('autocomplete', applyAnimation);
};
