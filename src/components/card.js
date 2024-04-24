const createCard = (item, handleDelete, handleLike, handleClick, userData) => {
    const cardTemplate = document.querySelector("#card-template");
    const cardElement = cardTemplate.content
        .querySelector(".places__item")
        .cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = item.imageUrl;
    cardImage.alt = item.cardName;
  
    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = item.cardName;
  
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    if (userData._id === item.owner._id) { 
      deleteButton.style.display = 'block';
    } else {
      deleteButton.style.display = 'none';
    }

    if (item.likes && item.likes.some(like => like._id === userData._id)) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }

    cardElement.addEventListener('click', () => {
        handleClick(item);
    });
    likeButton.addEventListener('click', () => {
        handleLike(item._id);
    });
    deleteButton.addEventListener('click', () => {
        handleDelete(item._id);
    });
  
    return cardElement;
};

export {
  createCard
};