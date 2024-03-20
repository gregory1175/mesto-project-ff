// импортируем изначальные карточки и функцию закрытия 
import {
  initialCards
} from '../pages/cards';
import {
  closePopup,
  openPopup
} from './modal';
// Назначаем переменные  
const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");
const imageUrl = document.querySelector('.popup__input_type_url');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardAddImage = document.querySelector('.popup_type_image');
const popupOpenImage = document.querySelector('.popup__image');
const popupOpenTitle = document.querySelector('.popup__caption');
const cardForm = document.querySelector('form[name="new-place"]');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupButtonAddCard = document.querySelector('.popup__button_add_card');
// callback функция, выводит карточки на страничку + определяет кнопку для удаления  
const createCardElement = (cardInfo, removeCallBack) => {
  const cardElement = cardTemplate.content
      .querySelector(".places__item")
      .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardElement.querySelector(".card__title").textContent = cardInfo.name;

  cardList.addEventListener('click', handleLike);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
      removeCallBack();
  });

  return cardElement;
};

// функция удаления начальных карточек 
const removeCard = (cardElement) => {
  cardElement.remove();
};

// выводим начальные карточки на страницу  
initialCards.forEach((cardInfo) => {
  const cardElement = createCardElement(cardInfo, () =>
      removeCard(cardElement),
  );

  cardList.append(cardElement);
});

// очистка полей popup при добалении пользователем карточки  
function clearInputFieldsCardCreateOnClose() {


  if (popupNewCard) {
      const inputTitle = popupNewCard.querySelectorAll('.popup__form input[type="text"]');
      const inputUrl = popupNewCard.querySelectorAll('.popup__form input[type="url"]');
      inputTitle.forEach((input) => {
          input.value = '';
      });
      inputUrl.forEach((input) => {
          input.value = '';
      });
  }
}

// создаем карточку (клонируем шаблон)
function item(event) {
  event.preventDefault();

  const cardNameValue = cardName.value;
  const imageUrlValue = imageUrl.value;

  const cardElement = cardTemplate.content.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = imageUrlValue;
  cardElement.querySelector(".card__title").textContent = cardNameValue;

  const placesList = document.querySelector('.places__list');
  placesList.insertBefore(cardElement, placesList.firstElementChild);
}
// Добавляем взаимодейвствие к нопкой delete
const handleDelete = (cardElement) => {
  cardElement.remove();
}
// Добавляем лайк на карточку
function handleLike(event) {
  const target = event.target;

  if (target.classList.contains('card__like-button')) {
      target.classList.toggle('card__like-button_is-active');
  }
}

// открываем popup карточки 
function handleClick() {
  cardList.addEventListener('click', (event) => {
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
//Добавление карточки на страницу пользователем  
function createCard(item, handleDelete, handleClick, handleLike) {
  // item(event) меняет поведение браузера
  popupButtonAddCard.addEventListener('click', function(event) {
      item(event);
      closePopup(popupNewCard);
  });

  // Добавляем обработчик на cardList для делегирования события клика
  cardList.addEventListener('click', (event) => {
      if (event.target.classList.contains('card__delete-button')) {
          const cardElement = event.target.closest('.places__item');
          handleDelete(cardElement);
      }

  });

  document.addEventListener('click', (event) => {
      if (event.target.classList.contains('card__image')) {
          handleClick();
      }
  });


  cardList.addEventListener('click', handleLike);
}

createCard(item, handleDelete, handleClick, handleLike)

export {
  createCardElement,
  removeCard,
  clearInputFieldsCardCreateOnClose,
  cardList
}