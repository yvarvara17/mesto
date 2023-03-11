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

const profileForm = document.forms['profile-form'];
const profileNameInput = document.querySelector('.profile-name-input');
const profileJobInput= document.querySelector('.profile-job-input');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.profile-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.profile-close');

const cardForm = document.forms['card-form'];
const cardNameInput = document.querySelector('.card-name-input');
const cardLinkInput = document.querySelector('.card-link-input');
const cardPopup = document.querySelector('.card-popup');
const cardButton = document.querySelector('.profile__add-button');
const cardCloseButton = document.querySelector('.card-close');

const galleryPopup = document.querySelector('.gallery-popup');
const galleryCloseButton = document.querySelector('.gallery-popup__close');

const closeButtons = document.querySelectorAll('.popup__close');

function setLike(e){
  e.target.classList.toggle('element__like_checked');
}
function removeCard(e){
  e.target.closest('.element').remove();
}
function openPopup(elem){
  elem.classList.add('popup_opened');
}
function closePopup(elem){
  elem.classList.remove('popup_opened');
}
function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;
  closePopup(profilePopup);
}
function handleFormSubmitCard (evt) {
  evt.preventDefault();
  itemListWrapper.prepend(createCard(cardNameInput.value, cardLinkInput.value));
  closePopup(cardPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
}
function insertData(name, link){
  galleryPopup.querySelector('.gallery-popup__img').src = link;
  galleryPopup.querySelector('.gallery-popup__img').title = name;
  galleryPopup.querySelector('.gallery-popup__title').textContent = name;
}
const createCard = (name, link) => {
  const cardElement = template.content.cloneNode(true);
  const cardElementTitle = cardElement.querySelector('.element__title');
  const cardElementImg = cardElement.querySelector('.element__image');
  const cardElementLike = cardElement.querySelector('.element__like');
  const cardElementTrash = cardElement.querySelector('.element__trash');
  cardElementTitle.textContent = name;
  cardElementImg.src = link;
  cardElementImg.alt = name;
  cardElementLike.addEventListener('click', setLike);
  cardElementTrash.addEventListener('click', removeCard);
  cardElementImg.addEventListener('click', () => { 
    openPopup(galleryPopup);
    insertData(name, link);
  });
  return cardElement;
}
const renderItem = (wrap, card) => {
  wrap.append(createCard(card.name, card.link))
}
initialCards.forEach((card) => {
  renderItem(itemListWrapper, card)
});
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
profileForm.addEventListener('submit', handleFormSubmitProfile);
profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileSubtitle.textContent;
});

cardForm.addEventListener('submit', handleFormSubmitCard);
cardButton.addEventListener('click', () => openPopup(cardPopup));