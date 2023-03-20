const itemListWrapper = document.querySelector('.elements');
const template = document.getElementById('item');

const profileForm = document.forms['profile-form'];
const profileNameInput = document.querySelector('.profile-name-input');
const profileJobInput = document.querySelector('.profile-job-input');
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
const galleryPopupImg = galleryPopup.querySelector('.gallery-popup__img');
const galleryPopupTitle = galleryPopup.querySelector('.gallery-popup__title');
const galleryCloseButton = document.querySelector('.gallery-popup__close');

const closeButtons = document.querySelectorAll('.popup__close');

const popups = document.querySelectorAll('.popup');

function setLike(e){
  e.target.classList.toggle('element__like_checked');
}
function removeCard(e){
  e.target.closest('.element').remove();
}
function closePopupOnKeyPress(evt){
  const openedPopup = document.querySelector('.popup_opened');
  if(openedPopup !== null && evt.key === 'Escape'){
    closePopup(openedPopup);
  }
}
function openPopup(elem){
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnKeyPress);
}
function closePopup(elem){
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnKeyPress);
}
function handleFormSubmitProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;
  closePopup(profilePopup);
  disableButton(evt.target.querySelector(validationConfig.submitButtonSelector), validationConfig.validSubmitButtonClass);
}
function handleFormSubmitCard (evt) {
  evt.preventDefault();
  itemListWrapper.prepend(createCard(cardNameInput.value, cardLinkInput.value));
  closePopup(cardPopup);
  cardForm.reset();
  disableButton(evt.target.querySelector(validationConfig.submitButtonSelector), validationConfig.validSubmitButtonClass);
}
function insertImageData(name, link){
  galleryPopupImg.src = link;
  galleryPopupImg.alt = name;
  galleryPopupTitle.textContent = name;
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
    insertImageData(name, link);
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

Array.from(popups).forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if(evt.target === evt.currentTarget){
        closePopup(evt.currentTarget)
    }
  });
});
