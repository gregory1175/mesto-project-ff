// импортируем стили
import './index.css'
// импортируем основные функции popup 
import {
    openPopup,
    closePopup
} from '../components/modal'
// импортируем изначальные карточки
import {
    initialCards
} from './cards'
// импортируем все что связано с карточками 
import {
    createCard
} from '../components/card';

const cardTemplate = document.querySelector("#card-template");
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupType = document.querySelector('.popup_type_edit')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const inputName = popupTypeEdit.querySelector('.popup__form input[name="name"]');
const inputInfo = popupTypeEdit.querySelector('.popup__form input[name="description"]');

const cardList = document.querySelector(".places__list");
const popupNewPlaceForm = document.querySelector('[name="new-place"]');
const popupEditForm = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const popupOpenImage = document.querySelector('.popup__image');
const popupOpenTitle = document.querySelector('.popup__caption');
const PopupTypeImage = document.querySelector('.popup_type_image');

const imageUrl = document.querySelector('.popup__input_type_url');
const cardName = document.querySelector('.popup__input_type_card-name');

// Base card create 
// callback функция, выводит карточки на страничку + определяет кнопку для удаления   
const createCardElement = (cardInfo, removeCallBack) => {
    const cardElement = cardTemplate.content
        .querySelector(".places__item")
        .cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardElement.querySelector(".card__title").textContent = cardInfo.name;

    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', (event) => {
        handleCardLike(event)
    });
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
        removeCallBack();
    });

    return cardElement;
};

initialCards.forEach((cardInfo) => {
    const cardElement = createCardElement(cardInfo, () =>
        handleCardDelete(cardElement),
    );
    cardList.append(cardElement);
});

// очистка полей popup при добавлении карточки 
function clearInputFieldsCardCreateOnClose() {
    if (popupNewPlaceForm) {
        popupNewPlaceForm.reset()
    }
}

// Обработчик «отправки» формы edit profile
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  
    // Так мы можем определить свою логику отправки.  
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;
    // закрытие формы после отправки данных   
    const profilePopup = document.querySelector('.popup_is-opened');
    closePopup(profilePopup);
}

// Прикрепляем обработчик к форме:  
popupEditForm.addEventListener('submit', handleFormSubmit)

// Изменение полей ввода popup при редактировании профиля  
function clearInputFieldsOnClose() {
    if (popupTypeEdit) {

        if (inputName) {
            inputName.value = nameElement.textContent;
        }

        if (inputInfo) {
            inputInfo.value = jobElement.textContent;
        }
    }
}

// Добавляем слушатель для popup edit for user   
profileEditButton.addEventListener('click', () => {
    openPopup(popupType);
    clearInputFieldsOnClose(popupType)
});

// Добавляем слушатель для popup add for user   
profileAddButton.addEventListener('click', () => {
    openPopup(popupNewCard)
    clearInputFieldsCardCreateOnClose(popupNewCard)
});

// работа лайка в карточке
const handleCardLike = (event) => {
    const target = event.target;
    if (target.classList.contains('card__like-button')) {
        target.classList.toggle('card__like-button_is-active');
    }
};

// открытие popup карточки
const handleCardClick = (event) => {
    if (event.target.classList.contains('card__image')) {
        const card = event.target.closest('.card');
        if (card) {
            const cardTitle = card.querySelector('.card__title');
            const cardImage = event.target;
            popupOpenTitle.textContent = cardTitle.textContent;
            popupOpenImage.src = cardImage.src;
            openPopup(PopupTypeImage)
        }
    }
};

// удаление карточки
const handleCardDelete = (cardElement) => {
    cardElement.remove();
};

// Для кнопки submit добавляем слушатели/функцию передаем значения новой карточки 
popupNewPlaceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cardNameValue = cardName.value;
    const imageUrlValue = imageUrl.value;
    const newCard = createCard({
        cardName: cardNameValue,
        imageUrl: imageUrlValue
    }, handleCardDelete, handleCardLike, handleCardClick);
    cardList.prepend(newCard);
    closePopup(popupNewCard)
});

// открываем popup карточки
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__image')) {
        handleCardClick(event);
    }
});