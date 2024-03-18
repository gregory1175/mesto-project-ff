// импортируем открытие 
import {
    openPopup
} from "./popupBase";
// функция добавление карточки пользователем
function addImagePopupListener() {
    const cardAddImage = document.querySelector('.popup_type_image');
    const container = document.querySelector('.places__list');
    const popupOpenImage = document.querySelector('.popup__image');
    const popupOpenTitle = document.querySelector('.popup__caption');

    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('card__image')) {
            const card = event.target.closest('.card');
            if (card) {
                const cardTitle = card.querySelector('.card__title');
                const cardImage = event.target;

                popupOpenTitle.textContent = cardTitle.textContent;
                popupOpenImage.src = cardImage.src;
                openPopup(cardAddImage);
            }
        }
    });
};

export {
    addImagePopupListener
}