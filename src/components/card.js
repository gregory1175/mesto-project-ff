const createCard = (item, handleDelete, handleLike, handleClick) => {
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

  if (item.isLiked) {
      likeButton.classList.add('card__like-button_is-active');
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