// импортируем стили
import './index.css'
// импортируем основные функции popup 
import {
    openPopup,
    closePopup,
    setPopupListeners
} from '../components/modal'
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
  loadUserInfo,
  getUserData,
  getInitialCards,
  pushMyInfo,
  addNewCard,
  updateProfileAvatar,
  likeApi,
  cardApiDelete
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
const cardLikeButton = document.querySelectorAll('.card__like-button') /* кнопка лайка */                                   

//popup аватара + кнопка открытия  
const popupButtonAvatar = document.querySelector('.profile__image')
const popupTypeAvatar = document.querySelector('.popup__type-avatar');
const newAvatarForm = document.querySelector('[name="new-avatar"]') 
const popupAvatarUrl = document.querySelector('.popup__input_type_avatar_url');

//загрузим информацию о пользователе
document.addEventListener('DOMContentLoaded', () => {
  loadUserInfo()
    .then(data => {
      popupButtonAvatar.style.backgroundImage = `url(${data.avatar})`;
      nameElement.textContent = data.name;
      jobElement.textContent = data.about;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});  

// Закрываем popup
setPopupListeners()

// Обработчик «отправки» формы edit profile
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.  
    // Так мы можем определить свою логику отправки.  
    const nameValue = inputName.value;
    const jobValue = inputInfo.value;

    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;
}

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
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__message-error-active'
  }); 

// Добавляем слушатель для popup edit for user   
profileEditButton.addEventListener('click', () => {
    openPopup(popupTypeEdit);
    clearInputFieldsOnClose(popupTypeEdit)
    clearValidation(popupTypeEdit)
});

// Добавляем слушатель для popup add for user   
profileAddButton.addEventListener('click', () => {
    openPopup(popupNewCard)
    clearInputFieldsCardCreateOnClose(popupNewCard)
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
// очистка полей popup при добавлении карточки 
function clearInputFieldsCardCreateOnClose() {
    if (popupNewPlaceForm) {
        popupNewPlaceForm.reset()
    }
}

// открываем popup карточки
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__image')) {
        handleCardClick(event);
    }
});

// Вызываем слушатель для popup edit
popupEditForm.addEventListener('submit', function(event) {
  handleFormSubmit(event)
  event.submitter.textContent = 'Сохранение...';
  const name = inputName.value;
  const description = inputInfo.value;
  const userData = {
  name: name,
  about: description
  };
  pushMyInfo(userData)
  .then(() => {
  event.submitter.textContent = 'Сохранить';
  closePopup(popupTypeEdit)
  })
  .catch((error) => {
  console.error('Error:', error);
  })
  .finally (() => {
  event.submitter.textContent = 'Сохранить';
  });
  })

// Вызовем слушатель для popup add card
popupNewPlaceForm.addEventListener('submit', async (event) => {
  const cardNameValue = cardName.value;
  const imageUrlValue = imageUrl.value;
  event.submitter.textContent = 'Сохранение...';

  try {
    const userData = await getUserData(); // Получаем данные пользователя
    const newCardData = {
      name: cardNameValue,
      link: imageUrlValue,
      _id: userData._id
    };
    event.submitter.textContent = 'Сохранить';
    
    // Создаем элемент карточки
    const response = await addNewCard(newCardData);
    const newCardElement = createCard({
      cardName: response.name,
      imageUrl: response.link,
      likesCount: response.likes.length,
      _id: response._id,
      owner: response.owner
    }, handleCardDelete, handleCardLike, handleCardClick, userData);
    // Добавляем элемент карточки в начало списка
    cardList.prepend(newCardElement);
    // Закрываем popup
    closePopup(popupNewCard);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    event.submitter.textContent = 'Сохранить';
  }
});

// Функция для обновления изображения профиля
function updateProfileImage(imageUrl) {
  popupButtonAvatar.style.backgroundImage = `url(${imageUrl})`;
}

// вызовем слушатель для popup add new Avatar
newAvatarForm.addEventListener('submit', (event) => {
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...';
  // присваиваем значение 
  const avatarUrl = popupAvatarUrl.value;
  // объект с ссылкой
  const newAvatarData = {
    avatar: avatarUrl
  };
  // вызовем Api запрос
  updateProfileAvatar(newAvatarData)
    .then(() => {
      event.submitter.textContent = 'Сохранить';
      // Обновляем изображение профиля после успешной загрузки на сервер
      updateProfileImage(avatarUrl); 
      closePopup(popupTypeAvatar);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally (() => {
      event.submitter.textContent = 'Сохранить';

    });
  });

// Обработчик лайка 
const handleCardLike = (cardId) => {
  likeApi(cardId)
      .then(data => {
          const likeCount = data.likes.length;
          const likeCountElement = document.querySelector(`[data-card-id="${cardId}"] .card__likes-counter`);
          likeCountElement.textContent = likeCount;
          const likeButton = document.querySelector(`[data-card-id="${cardId}"] .card__like-button`);
          likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch(error => {
          console.error('Error:', error);
      });
};

// удаление карточки 
const handleCardDelete = (cardId) => {
  cardApiDelete(cardId)
    .then(response => {
      if (response && response.ok) {
        const cardToDelete = document.querySelector(`[data-card-id="${cardId}"]`);
        if (cardToDelete) {
          cardToDelete.remove(); 
        } else {
          throw new Error('Элемент карточки не найден');
        }
      } else {
        throw new Error('Ошибка при удалении карточки');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};


// открываем popup карточки 
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

// выводим добавленные карточки 
const addInitialCards = () => {
  Promise.all([getUserData(), getInitialCards()])
    .then(([userData, cards]) => {
      cards.forEach((cardInfo) => {
        const cardElement = createCard(
          {
            cardName: cardInfo.name,
            imageUrl: cardInfo.link,
            likesCount: cardInfo.likes.length,
            _id: cardInfo._id,
            owner: cardInfo.owner 
          },
          handleCardDelete,
          handleCardLike,
          handleCardClick,
          userData
        );
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
