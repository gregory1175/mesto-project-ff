import {handleFormSubmit, clearInputFieldsOnClose} from '../components/popupSubmit'
import { clearInputFieldsCardCreateOnClose} from '../components/card'
function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__content') || evt.target.classList.contains('popup_is-opened')) {
            closePopup(popupElement);
        }
    });
    const closeButtonPopup = popupElement.querySelector('.popup__close');
    if (closeButtonPopup) {
        closeButtonPopup.addEventListener('click', () => {
            closePopup(popupElement);
        });
        
    }
    clearInputFieldsOnClose();
    clearInputFieldsCardCreateOnClose();
}


function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__content') || evt.target.classList.contains('popup_is-opened')) {
            closePopup(popupElement);
        }
    });
}

function handleEscape(evt) {
    if (evt.key === 'Escape') 
     {
        const profilePopup = document.querySelector('.popup_is-opened');
        closePopup(profilePopup);
    }
}

export {openPopup, closePopup}

function addCardLike(popupElement) {
    if (popupElement.classList.contains('card__like-button_is-active')) {
        popupElement.classList.remove('card__like-button_is-active');
    } else {
        popupElement.classList.add('card__like-button_is-active');
    }
}