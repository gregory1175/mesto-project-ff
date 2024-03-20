import {
    clearInputFieldsCardCreateOnClose
} from './card'

let profilePopup = document.querySelector('.popup_is-opened');

function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    clearInputFieldsOnClose();
    clearInputFieldsCardCreateOnClose();
    profilePopup = popupElement;
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleClickOutside);
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(profilePopup);
    }
}

function handleClickOutside(evt) {
    if (evt.target.classList.contains('popup__content') || evt.target === profilePopup) {
        closePopup(profilePopup);
    }
}

// button close
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(profilePopup);
    }
});

// Находим форму в DOM 
const formElement = document.querySelector('.popup__form')

// Находим поля формы в DOM 
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')

// Обработчик «отправки» формы 
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
    // Так мы можем определить свою логику отправки. 
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const nameElement = document.querySelector('.profile__title');
    const jobElement = document.querySelector('.profile__description');

    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;
    // закрытие формы после отправки данных  
    const profilePopup = document.querySelector('.popup_is-opened');
    closePopup(profilePopup);
}
// Прикрепляем обработчик к форме: 
formElement.addEventListener('submit', handleFormSubmit);

// Очистка полей ввода при закрытии окна 
function clearInputFieldsOnClose() {
    const popup = document.querySelector('.popup_type_edit');
    const nameElement = document.querySelector('.profile__title');
    const jobElement = document.querySelector('.profile__description');

    if (popup) {
        const inputName = popup.querySelector('.popup__form input[name="name"]');
        const inputInfo = popup.querySelector('.popup__form input[name="description"]');

        if (inputName) {
            inputName.value = nameElement.textContent;
        }

        if (inputInfo) {
            inputInfo.value = jobElement.textContent;
        }
    }
}

export {
    openPopup,
    closePopup,
    handleFormSubmit,
    clearInputFieldsOnClose
};