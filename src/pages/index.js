// импортируем стили
import './index.css'
// импортируем основные функции popup 
import {
    openPopup,
    closePopup
} from '../components/modal'
<<<<<<< HEAD
// импортируем все что связано с карточками 
import {
    createCard
} from '../components/card'
// импортируем функцию валмдации форм 
import {
  enableValidation,
  clearValidation
} from '../components/formValidator'
// импортируем API запросы
import {
  config,
  loadUserInfo,
  getUserData,
  getInitialCards,
  pushMyInfo,
  addNewCard,
  updateProfileAvatar
} from '../components/API'
// Сюда добавлять карточки 
const cardList = document.querySelector(".places__list");

// заголовок профиля x описание профиля 
const nameElement = document.querySelector('.profile__title');  
const jobElement = document.querySelector('.profile__description'); 

// Все формы внутри popup
const popupForm = document.querySelector('.popup__form')

// Popup редактора профиля + кнопка для его открытия 
const profileEditButton = document.querySelector('.profile__edit-button') /* кнопка открытия попапа редактора профиля */
const popupTypeEdit = document.querySelector('.popup_type_edit');  /* попап редактор профиля */
const popupEditForm = document.querySelector('[name="edit-profile"]'); /* форма popup */
const inputName = popupTypeEdit.querySelector('.popup__form input[name="name"]'); /* строка для изменения имени */
const inputInfo = popupTypeEdit.querySelector('.popup__form input[name="description"]'); /* строка для изменения описания */

// Popup добавить карточку + кнопка для его открытия 
const profileAddButton = document.querySelector('.profile__add-button')  /* кнопка открытия попапа добавления карточки */
const popupNewCard = document.querySelector('.popup_type_new-card'); /* попап добавления карточки */
const popupNewPlaceForm = document.querySelector('[name="new-place"]'); /* форма popup */ 
const imageUrl = document.querySelector('.popup__input_type_url'); /* строка для добавления ссылки */ 
const cardName = document.querySelector('.popup__input_type_card-name'); /* строка для добавления названия*/

// Popup карточки + кнопка для его открытия 
const popupTypeImage = document.querySelector('.popup_type_image'); /* контейнер popup */ 
const popupOpenImage = document.querySelector('.popup__image'); /* изображение */
const popupOpenTitle = document.querySelector('.popup__caption'); /* текст */

//popup аватара + кнопка открытия  
const popupButtonAvatar = document.querySelector('.profile__image')
const popupTypeAvatar = document.querySelector('.popup__type-avatar');
const newAvatarForm = document.querySelector('[name="new-avatar"]') 
const popupAvatarUrl = document.querySelector('.popup__input_type_avatar_url');

//загрузим информацию о пользователе
loadUserInfo()
=======
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

>>>>>>> main
// Обработчик «отправки» формы edit profile
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  
    // Так мы можем определить свою логику отправки.  
<<<<<<< HEAD
    const nameValue = inputName.value;
    const jobValue = inputInfo.value;
=======
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
>>>>>>> main

    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;
    // закрытие формы после отправки данных   
    const profilePopup = document.querySelector('.popup_is-opened');
    closePopup(profilePopup);
}

<<<<<<< HEAD
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

// Валидация формы "Редактировать профиль"
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-inactive',
    inputErrorClass: 'span-text',
    errorClass: 'popup__message-error-active'
  }); 

// Добавляем слушатель для popup edit for user   
profileEditButton.addEventListener('click', () => {
    openPopup(popupTypeEdit);
    clearInputFieldsOnClose(popupTypeEdit)
    clearValidation(popupTypeEdit)
=======
// Прикрепляем обработчик к форме:  
popupEditForm.addEventListener('submit', handleFormSubmit)

// // Изменение полей ввода popup при редактировании профиля  
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
>>>>>>> main
});

// Добавляем слушатель для popup add for user   
profileAddButton.addEventListener('click', () => {
    openPopup(popupNewCard)
    clearInputFieldsCardCreateOnClose(popupNewCard)
<<<<<<< HEAD
    clearValidation(popupNewCard)
});

// Добавляем слушатель для popup add avatar 
popupButtonAvatar.addEventListener('click', () => {
  openPopup(popupTypeAvatar)
  clearInputFieldsAvatarCreateOnClose(popupTypeAvatar)
  clearValidation(popupTypeAvatar)
})

// очистка полей popup при добавлении аватара 
function clearInputFieldsAvatarCreateOnClose() {
  if (newAvatarForm) {
    newAvatarForm.reset()
  }
}
=======
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
  
        const altText = cardTitle.textContent;
        cardImage.alt = altText; 
  
        popupOpenTitle.textContent = cardTitle.textContent;
        popupOpenImage.src = cardImage.src;
        popupOpenImage.alt = cardImage.alt; 
  
        openPopup(PopupTypeImage);
      }
    }
  };
  
>>>>>>> main
// очистка полей popup при добавлении карточки 
function clearInputFieldsCardCreateOnClose() {
    if (popupNewPlaceForm) {
        popupNewPlaceForm.reset()
    }
}

<<<<<<< HEAD
=======
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

>>>>>>> main
// открываем popup карточки
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__image')) {
        handleCardClick(event);
    }
});

<<<<<<< HEAD
// Вызываем слушатель для popup edit
popupEditForm.addEventListener('submit', function(event) {
  handleFormSubmit(event)
  popupEditForm.querySelector('button[type="submit"]').textContent = 'Сохранение...';
  const name = inputName.value;
  const description = inputInfo.value;
  popupEditForm
  const userData = {
    name: name,
    about: description
  };  
  pushMyInfo(userData)    
  .then(() => {
    popupEditForm.querySelector('button[type="submit"]').textContent = 'Сохранить';
  })
  .catch((error) => {
    console.error('Error:', error);
    popupEditForm.querySelector('button[type="submit"]').textContent = 'Сохранить';
  });
})

// Вызовем слушатель для popup add card
popupNewPlaceForm.addEventListener('submit', () => {
  const cardNameValue = cardName.value;
  const imageUrlValue = imageUrl.value;
  popupNewPlaceForm.querySelector('button[type="submit"]').textContent = 'Сохранение...';
  const newCardData = {
    name: cardNameValue,
    link: imageUrlValue,
    likes: [],
    id: []
  };
  cardList.prepend(newCardData);
  addNewCard(newCardData)
  .then(() => {
    popupNewPlaceForm.querySelector('button[type="submit"]').textContent = 'Сохранить';
  })
  .catch((error) => {
    console.error('Error:', error);
    popupNewPlaceForm.querySelector('button[type="submit"]').textContent = 'Сохранить';
  });

  closePopup(popupNewCard);
}); 

// вызовем слушатель для popup add new Avatar
newAvatarForm.addEventListener('submit', (event) => {
  event.preventDefault();
  newAvatarForm.querySelector('button[type="submit"]').textContent = 'Сохранение...';
  const AvatarUrl = popupAvatarUrl.value;
  const newAvatarData = {
    avatar: AvatarUrl
  };
    updateProfileAvatar(newAvatarData)    
    .then(() => {
      newAvatarForm.querySelector('button[type="submit"]').textContent = 'Сохранить';
    })
    .catch((error) => {
      console.error('Error:', error);
      newAvatarForm.querySelector('button[type="submit"]').textContent = 'Сохранить';
    });

    closePopup(popupTypeAvatar)
});

  // работа лайка в карточке
  const handleCardLike = (cardId) => {
    const likeButton = document.querySelector(`[data-card-id="${cardId}"] .card__like-button`);
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const method = isLiked ? 'DELETE' : 'PUT';
  
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: {
        authorization: 'f2bbc15d-d383-4504-ace0-4ea13442598d'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update like status');
      }
      return response.json();
  
    })
    .then(data => {
      console.log(data)
      const likeCount = data.likes.length;
      const likeCountElement = document.querySelector(`[data-card-id="${cardId}"] .card__likes-counter`);
      likeCountElement.textContent = likeCount;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(error => {
      console.error('Error updating like status:', error);
    });
  };
  
  const handleCardClick = (event) => {
    if (event.target && event.target.classList && event.target.classList.contains('card__image')) {
      const card = event.target.closest('.card');
      if (card) {
        const cardTitle = card.querySelector('.card__title');
        const cardImage = event.target;
  
        const altText = cardTitle ? cardTitle.textContent : "";
        cardImage.alt = altText; 
  
        popupOpenTitle.textContent = cardTitle ? cardTitle.textContent : "";
        popupOpenImage.src = cardImage.src;
        popupOpenImage.alt = cardImage.alt; 
  
        openPopup(popupTypeImage);
      }
    }
  };
  
  const handleCardDelete = (cardId) => {
    const confirmation = confirm('Вы уверены что хотите удалить эту карточку?');
    if (confirmation) {
      fetch(`https://nomoreparties.co/v1/wff-cohort-11/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: 'f2bbc15d-d383-4504-ace0-4ea13442598d'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete card');
        }
        const cardToDelete = document.querySelector(`[data-card-id="${cardId}"]`);
        cardToDelete.remove();
      })
      .catch(error => {
        console.error('Error deleting card:', error);
      });
    }
  };

  // выводим добавленные карточки 
  const addInitialCards = () => {
    Promise.all([getUserData(), getInitialCards()])
      .then(([userData, cards]) => {
        cards.forEach((cardInfo) => {
          const cardElement = createCard({
            cardName: cardInfo.name,
            imageUrl: cardInfo.link,
            likesCount: cardInfo.likes.length,
            _id: cardInfo._id
          }, handleCardDelete, handleCardLike, handleCardClick, userData);
          cardElement.dataset.cardId = cardInfo._id;
          const likeCountElement = cardElement.querySelector('.card__likes-counter');
          likeCountElement.textContent = cardInfo.likes.length;
          cardList.append(cardElement);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  addInitialCards()
=======
// Выводим базовые карточки  
initialCards.forEach((cardInfo) => {
    const cardElement = createCard({
      cardName: cardInfo.name,
      imageUrl: cardInfo.link
    }, handleCardDelete, handleCardLike, handleCardClick);
    cardList.append(cardElement);
  });
>>>>>>> main
