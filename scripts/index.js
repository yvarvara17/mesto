const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const itemListWrapper = document.querySelector('.elements');
const template = document.getElementById('item');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-input_type_name');
let jobInput = document.querySelector('.popup__form-input_type_job');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let modal = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close');

let popupCard = document.querySelector('#card');
let formElementCard = popupCard.querySelector('.popup__form');
let nameInputCard = popupCard.querySelector('.popup__form-input_type_name');
let linkInputCard = popupCard.querySelector('.popup__form-input_type_job');
let addButton = document.querySelector('.profile__add-button');
let closeButtonCard = popupCard.querySelector('.popup__close');

let imgPopup = document.querySelector('.gallery');
let imgClose = document.querySelector('.gallery__close');

function setLike(e){
  e.target.classList.toggle('element__like_checked');
}
function removeCard(e){
  e.target.closest('.element').remove();
}
function openModalEdit(){
  modal.classList.add('popup_opened');
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}
function closeModalEdit(){
  modal.classList.remove('popup_opened');
}
function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closeModalEdit();
}

function openModalCard(){
  popupCard.classList.add('popup_opened');
  nameInputCard.value = 'Название';
  linkInputCard.value = 'Ссылка на картинку';
}
function closeModalCard(){
  popupCard.classList.remove('popup_opened');
}
function handleFormSubmitCard (evt) {
  evt.preventDefault();
  itemListWrapper.prepend(addCard(nameInputCard.value, linkInputCard.value));
  closeModalCard();
}
function openBigImg(evt){
  imgPopup.classList.add('gallery_opened');
  imgPopup.querySelector('.gallery__img').src = evt.target.src;
  imgPopup.querySelector('.gallery__title').textContent = evt.target.parentElement.querySelector('.element__title').textContent;
}
function closeBigImg(){
  imgPopup.classList.remove('gallery_opened');
}

const addCard = (name, link) => {
  const newItemElement = template.content.cloneNode(true);
  const newItemTitle = newItemElement.querySelector('.element__title');
  const newItemImg = newItemElement.querySelector('.element__image');
  const newItemElementLike = newItemElement.querySelector('.element__like');
  const newItemElementTrash = newItemElement.querySelector('.element__trash');
  newItemTitle.textContent = name;
  newItemImg.src = link;
  newItemImg.alt = name;
  newItemElementLike.addEventListener('click', setLike);
  newItemElementTrash.addEventListener('click', removeCard);
  return newItemElement;
}
const getItemElement = (card) => {
  const newItemElement = template.content.cloneNode(true);
  const newItemTitle = newItemElement.querySelector('.element__title');
  const newItemImg = newItemElement.querySelector('.element__image');
  newItemTitle.textContent = card.name;
  newItemImg.src = card.link;
  newItemImg.alt = card.name;
  return newItemElement;
}
const renderItem = (wrap, card) => {
  wrap.append(getItemElement(card))
}
initialCards.forEach((card) => {
  renderItem(itemListWrapper, card)
})
formElement.addEventListener('submit', handleFormSubmitEdit);
editButton.addEventListener('click', openModalEdit);
closeButton.addEventListener('click', closeModalEdit);

formElementCard.addEventListener('submit', handleFormSubmitCard);
addButton.addEventListener('click', openModalCard);
closeButtonCard.addEventListener('click', closeModalCard);
imgClose.addEventListener('click', closeBigImg);

let likes = document.getElementsByClassName('element__like');
let likesArr = Array.from(likes);
let trashes = document.getElementsByClassName('element__trash');
let trashArr = Array.from(trashes);
let images = document.getElementsByClassName('element__image');
let imagesArr = Array.from(images);
likesArr.forEach(item => item.addEventListener('click', setLike));
trashArr.forEach(item => item.addEventListener('click', removeCard));
imagesArr.forEach(item => item.addEventListener('click', openBigImg));