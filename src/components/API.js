import {
  request,
  checkResponse
} from '../../utils/utils'
// Данные пользователя 
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
  headers: {
      authorization: 'f2bbc15d-d383-4504-ace0-4ea13442598d',
      'Content-Type': 'application/json'
  }
}

// Загружаем информацию пользователя
async function loadUserInfo() {
    const response = await fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    });
    const data = await checkResponse(response);
    return data;
  } 


// Получаем данные пользователя 
async function getUserData() { 
  const res = await fetch(`${config.baseUrl}/users/me`, { 
    method: 'GET', 
    headers: config.headers 
  }); 
  return await res.json(); 
} 


// Получаем карточки
async function getInitialCards(data) {
  const res = await fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers,
      body: JSON.stringify(data)
  });
  return await res.json();
}

// отправляем новые данные пользователя 
async function pushMyInfo(data) {
      const res = await request(`${config.baseUrl}/users/me`, {
          method: 'PATCH',
          headers: config.headers,
          body: JSON.stringify(data)
      })
}

// Запрос на добавление карточки
async function addNewCard(data) {
  const res = await fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(data)

    });
    const responseData = await res.json(); 
    return responseData;
}

// обновляем аватар
async function updateProfileAvatar(data) {
      const res = await request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
  });
}
// запрос лайка 
const likeApi = (cardId) => {
  const likeButton = document.querySelector(`[data-card-id="${cardId}"] .card__like-button`);
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const method = isLiked ? 'DELETE' : 'PUT';

  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: config.headers,
  });
};

// запрос на удаление карточки 
const cardApiDelete = (cardId) => { 
  const confirmation = confirm('Вы уверены что хотите удалить эту карточку?');
  if (confirmation) {
      return fetch(`${config.baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: config.headers,
      });
  } else {
      return Promise.resolve();
  }
}; 

export {
  config,
  loadUserInfo,
  getUserData,
  getInitialCards,
  pushMyInfo,
  addNewCard,
  updateProfileAvatar,
  likeApi,
  cardApiDelete
}