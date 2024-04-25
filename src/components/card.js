const createCard = (item, handleDelete, handleLike, handleClick, userData) => {
    const cardTemplate = document.querySelector("#card-template");
    const cardElement = cardTemplate.content
        .querySelector(".places__item")
        .cloneNode(true);

    cardElement.dataset.cardId = item._id;

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = item.imageUrl;
    cardImage.alt = item.cardName;

    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = item.cardName;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (userData._id === item.owner._id) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    }

    const likeCountElement = cardElement.querySelector('.card__likes-counter'); 
    likeCountElement.textContent = item.likesCount; 

    const likeButton = cardElement.querySelector('.card__like-button');
    
    if (item.likes && Array.isArray(item.likes)) {

        const likedByCurrentUser = item.likes.some(like => like._id === userData._id);
        if (likedByCurrentUser) {
            likeButton.classList.add('card__like-button_is-active');
        }
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