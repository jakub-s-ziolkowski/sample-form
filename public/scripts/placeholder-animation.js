'use strict';

const animatePlaceholder = element => {

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

const animatePlaceholderAll = placeholdersList => placeholdersList.forEach(animatePlaceholder);

export { animatePlaceholder as default, animatePlaceholderAll };
