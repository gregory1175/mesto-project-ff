// Данные пользователя 
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
    headers: {
      authorization: 'f2bbc15d-d383-4504-ace0-4ea13442598d',
      'Content-Type': 'application/json'
    }
  }
  
  // Загружаем информацию пользователя
  function loadUserInfo() {
    fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
    }).then(response => {
    return response.json();
    }).then(data => {
      console.log(data)
    const profileImage = document.querySelector('.profile__image');
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    
     profileImage.style.backgroundImage = `url(${data.avatar})`;
     profileTitle.textContent = data.name;
     profileDescription.textContent = data.about;
    }).catch(error => {
    console.log('Error fetching user data: ', error);
    });
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
  async function getInitialCards() {
    const res = await fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: 'f2bbc15d-d383-4504-ace0-4ea13442598d'
      }
    });
    return await res.json();
  }
  // отправляем новые данные пользователя 
  async function pushMyInfo(data) {
    try {
      const res = await fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
      })
      const data_1 = await res.json()
      console.log('Profile updated successfully', data_1)
    } catch (error) {
      console.error('Error updating profile', error)
    }
  }
  
  async function addNewCard(data) {
    try {
      const res = await fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
      })
      const data_1 = await res.json()
      console.log('Card uploaded successfully', data_1)
    } catch (error) {
      console.error('Error uploading card', error)
    }
  }
  
  async function updateProfileAvatar(data) {
    try {
      const res = await fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
      })
      const data_1 = await res.json()
      console.log('Фото профиля было успешно обновлено:', data_1)
    } catch (error) {
      console.error('Ошибка обновления фото профиля:', error)
    }
  }

export {
    config,
    loadUserInfo,
    getUserData,
    getInitialCards,
    pushMyInfo,
    addNewCard,
    updateProfileAvatar
}