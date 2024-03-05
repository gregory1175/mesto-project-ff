let cardList = document.querySelector('.places__list');
let cardTemplate = document.querySelector('#card-template');

const createCardElement = (cardInfo, removeCallBack) => {
const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);

cardElement.querySelector('.card__image').src = cardInfo.link;
cardElement.querySelector('.card__title').alt = cardInfo.name;
cardElement.querySelector('.card__title').textContent = cardInfo.name;

let deleteButton = cardElement.querySelector('.card__delete-button');
deleteButton.addEventListener('click', () => {
cardElement.remove();
removeCallBack();

});

return cardElement; 
};

const removeCard = (cardElement) => {
cardElement.remove();
};

initialCards.forEach((cardInfo) => {
const cardElement = createCardElement(cardInfo, () => removeCard(cardElement));
cardList.append(cardElement);
});