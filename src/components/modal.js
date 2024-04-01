let profilePopup = document.querySelector('.popup_is-opened');

function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    profilePopup = popupElement;
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('mousedown', handleClickOutside);
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(profilePopup);
    }
}

function handleClickOutside(evt) {
    if ((evt.target.classList.contains('.popup__content') || evt.target === profilePopup)) {
        closePopup(profilePopup);
    }
}

document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(profilePopup);
    }
});

export {
    openPopup,
    closePopup,
};