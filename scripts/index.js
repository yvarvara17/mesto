import Card from './Card.js';
import initialCards from './cards.js';
import Section from '../components/Section.js';
import FormValidator from './FormValidator.js';
// import {openPopup, closePopup} from './utils.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const forms = document.forms;
// const closeButtons = document.querySelectorAll('.popup__close');
// const popups = document.querySelectorAll('.popup');
const profileForm = forms['profile-form'];
// const cardForm = forms['card-form'];
const profileEditButton = document.querySelector('.profile__edit-button');
// const profilePopup = document.querySelector('.profile-popup');
const cardButton = document.querySelector('.profile__add-button');
// const cardPopup = document.querySelector('.card-popup');
const validationFormProfile = new FormValidator(validationConfig, 'profile-form');
const validationFormCard = new FormValidator(validationConfig, 'card-form');
const profileNameInput = profileForm.querySelector('.profile-name-input');
const profileJobInput = profileForm.querySelector('.profile-job-input');
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');
// const cardNameInput = document.querySelector('.card-name-input');
// const cardLinkInput = document.querySelector('.card-link-input');
const itemListWrapper = document.querySelector('.elements');
const userInfo = new UserInfo({ name: '.profile-name-input', job: '.profile-job-input' });

const profilePopup = new PopupWithForm({selector: '.profile-popup', handleFormSubmit: (data) => userInfo.setUserInfo(data)});
profilePopup.setEventListeners();
const cardPopup = new PopupWithForm({selector: '.card-popup', handleFormSubmit: (data) => cardsList.addItem(createCardWithListener(data), true)});
cardPopup.setEventListeners();

const popupImage = new PopupWithImage('.gallery-popup');
popupImage.setEventListeners();
// const popupImageCloseButton = document.querySelector('.gallery-popup__close');
// console.log(popupImage);
// const p = new Popup('.gallery-popup');
// popupImage.open();

const handleClickOpenPopupProfile = () => {
  // profileNameInput.value = profileTitle.textContent;
  // profileJobInput.value = profileSubtitle.textContent;
  const savedUserData = userInfo.getUserInfo();
  profileNameInput.value = savedUserData.name;
  profileJobInput.value = savedUserData.job;
  validationFormProfile.resetValidation();
  profilePopup.open();
}

// const handleFormSubmitProfile = (evt) => {
//   evt.preventDefault();
//   profileTitle.textContent = profileNameInput.value;
//   profileSubtitle.textContent = profileJobInput.value;
//   closePopup(profilePopup);
//   validationFormProfile.disableButton();
// }

// const handleFormSubmitCard = (evt) => {
//   evt.preventDefault();
//   renderItem(addCard({name: cardNameInput.value, link: cardLinkInput.value}, 'item'), true);
//   closePopup(cardPopup);
//   cardForm.reset();
//   validationFormCard.disableButton();
// }

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

// const checkTargetAndClose = (evt) => {
//   if(evt.target === evt.currentTarget){
//     closePopup(evt.currentTarget);
//   }
// }

const createCardWithListener = (cardItem) => {
  const card = new Card({ cardItem, handleCardClick: () => {
    popupImage.open(cardItem);
  }
}, 'item');
  return card.createCard();
}

const cardsList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const cardElement = createCardWithListener(cardItem);
    cardsList.addItem(cardElement, false);
    }
  },
  '.elements'
);

cardsList.renderItems();

// initialCards.forEach((card) => {
//   renderItem(addCard(card, 'item'), false);
// });

// closeButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// });

// Array.from(popups).forEach(popup => {
//   popup.addEventListener('click', (evt) => {
//     checkTargetAndClose(evt);
//   });
// });

// Array.from(popups).forEach(popup => {
//   popup.setEventListeners();
// });

// profileForm.addEventListener('submit', handleFormSubmitProfile);
validationFormProfile.enableValidation();
profileEditButton.addEventListener('click', handleClickOpenPopupProfile);

// cardForm.addEventListener('submit', handleFormSubmitCard);
validationFormCard.enableValidation();
cardButton.addEventListener('click', () => cardPopup.open());

// document.addEventListener('click', (evt) => {
//   if(evt.target === evt.currentTarget){
//     close(evt.currentTarget);
//   }
// });

export {renderItem, addCard};
