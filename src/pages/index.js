// импорт стилей 
import './index.css' 
// импорт функция открытия/закрытия  
import { 
    closePopup, 
    openPopup,
    handleFormSubmit, 
    clearInputFieldsOnClose 
} from '../components/modal'; 
// импорт 
import { 
    createCardElement, 
    removeCard, 
    cardList,
} from '../components/card'; 

// Назначим эллементы, добавим обработчики 
const popupCloseButton = document.querySelectorAll('popup__close');

// функция открытия popup edit for user  
const popupType = document.querySelector('.popup_type_edit') 
const profileEditButton = document.querySelector('.profile__edit-button') 
profileEditButton.addEventListener('click', () => { 
    openPopup(popupType); 
}); 
 
// функция открытия popup add for user  
const popupAdd = document.querySelector('.popup_type_new-card') 
const profileAddButton = document.querySelector('.profile__add-button') 
profileAddButton.addEventListener('click', () => { 
    openPopup(popupAdd) 
}); 