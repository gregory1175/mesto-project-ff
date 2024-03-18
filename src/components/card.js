// импортируем изначальные карточки и функцию закрытия
import {
  initialCards
} from '../pages/cards';
import {
  closePopup
} from './popupBase';
// Назначаем переменные 
const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");

// callback функция, выводит карточки на страничку + определяет кнопку для удаления 
const createCardElement = (cardInfo, removeCallBack) => {
  const cardElement = cardTemplate.content
      .querySelector(".places__item")
      .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardElement.querySelector(".card__title").textContent = cardInfo.name;

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
  const popup = document.querySelector('.popup_type_new-card');

  if (popup) {
      const inputTitle = popup.querySelectorAll('.popup__form input[type="text"]');
      const inputUrl = popup.querySelectorAll('.popup__form input[type="url"]');
      inputTitle.forEach((input) => {
          input.value = '';
      });
      inputUrl.forEach((input) => {
          input.value = '';
      });
  }
}

//Добавление карточки на страницу пользователем 
function handleSubmit(event) {
  event.preventDefault();
  const cardName = document.querySelector('.popup__input_type_card-name').value;
  const imageUrl = document.querySelector('.popup__input_type_url').value;

  const cardElement = cardTemplate.content
      .querySelector(".places__item")
      .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = imageUrl
  cardElement.querySelector(".card__title").textContent = cardName

  const placesList = document.querySelector('.places__list');
  const firstListItem = placesList.querySelector('li:first-child');
  placesList.insertBefore(cardElement, firstListItem);

  const CardPopup = document.querySelector('.popup_type_new-card');
  closePopup(CardPopup);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
      cardElement.remove();

  });

}

//функция добавления карточки на страницу 
const form = document.querySelector('form[name="new-place"]');
form.addEventListener('submit', handleSubmit);

// Добавляем лайк на карточку
function addCardLike() {
  const container = document.querySelector('.places__list');

  container.addEventListener('click', (event) => {
      const target = event.target;

      if (target.classList.contains('card__like-button')) {
          if (target.classList.contains('card__like-button_is-active')) {
              target.classList.remove('card__like-button_is-active');
          } else {
              target.classList.add('card__like-button_is-active');
          }
      }
  });
}

addCardLike()

export {
  createCardElement,
  removeCard,
  clearInputFieldsCardCreateOnClose,
  cardList
}