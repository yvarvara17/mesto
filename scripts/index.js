import Card from './Card.js';
import initialCards from './cards.js';
import FormValidator from './FormValidator.js';
import {openPopup, closePopup} from './utils.js'

const forms = document.forms;
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const profileForm = forms['profile-form'];
const cardForm = forms['card-form'];
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.profile-popup');
const cardButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.card-popup');
const validationFormProfile = new FormValidator(validationConfig, 'profile-form');
const validationFormCard = new FormValidator(validationConfig, 'card-form');
const profileNameInput = profileForm.querySelector('.profile-name-input');
const profileJobInput = profileForm.querySelector('.profile-job-input');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardNameInput = document.querySelector('.card-name-input');
const cardLinkInput = document.querySelector('.card-link-input');
const itemListWrapper = document.querySelector('.elements');

const handleClickOpenPopupProfile = () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileSubtitle.textContent;
  validationFormProfile.resetValidation();
  openPopup(profilePopup);
}

const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileJobInput.value;
  closePopup(profilePopup);
  validationFormProfile.disableButton();
}

const handleFormSubmitCard = (evt) => {
  evt.preventDefault();
  renderItem(addCard({name: cardNameInput.value, link: cardLinkInput.value}, 'item'), true);
  closePopup(cardPopup);
  cardForm.reset();
  validationFormCard.disableButton();
}

const addCard = (card, templateSelector) => {
  return new Card(card, templateSelector).createCard();
}

const renderItem = (card, createdByButton) => {
  if(!createdByButton){
    itemListWrapper.append(card);
  }
  else{
    itemListWrapper.prepend(card);
  }
}

const checkTargetAndClose = (evt) => {
  if(evt.target === evt.currentTarget){
    closePopup(evt.currentTarget);
  }
}

initialCards.forEach((card) => {
  renderItem(addCard(card, 'item'), false);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

Array.from(popups).forEach(popup => {
  popup.addEventListener('click', (evt) => {
    checkTargetAndClose(evt);
  });
});

profileForm.addEventListener('submit', handleFormSubmitProfile);
validationFormProfile.enableValidation();
profileEditButton.addEventListener('click', handleClickOpenPopupProfile);

cardForm.addEventListener('submit', handleFormSubmitCard);
validationFormCard.enableValidation();
cardButton.addEventListener('click', () => openPopup(cardPopup));

export {renderItem, addCard};
