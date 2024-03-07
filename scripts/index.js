const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");

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

const removeCard = (cardElement) => {
  cardElement.remove();
};

initialCards.forEach((cardInfo) => {
  const cardElement = createCardElement(cardInfo, () =>
    removeCard(cardElement),
  );

  cardList.append(cardElement);
});