import Card from '../components/Card.js';
import initialCards from '../components/cards.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const forms = document.forms;
const profileForm = forms['profile-form'];
const profileEditButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const validationFormProfile = new FormValidator(validationConfig, 'profile-form');
const validationFormCard = new FormValidator(validationConfig, 'card-form');
const profileNameInput = profileForm.querySelector('.profile-name-input');
const profileJobInput = profileForm.querySelector('.profile-job-input');
const userInfo = new UserInfo({ name: '.profile-name-input', job: '.profile-job-input' });

const profilePopup = new PopupWithForm({selector: '.profile-popup', handleFormSubmit: (data) => userInfo.setUserInfo(data)});
profilePopup.setEventListeners();
const cardPopup = new PopupWithForm({selector: '.card-popup', handleFormSubmit: (data) => cardsList.addItem(createCardWithListener(data), true)});
cardPopup.setEventListeners();

const popupImage = new PopupWithImage('.gallery-popup');
popupImage.setEventListeners();

const handleClickOpenPopupProfile = () => {
  const savedUserData = userInfo.getUserInfo();
  profileNameInput.value = savedUserData.name;
  profileJobInput.value = savedUserData.job;
  validationFormProfile.resetValidation();
  profilePopup.open();
}

const createCardWithListener = (cardItem) => {
  const card = new Card({ cardItem, handleCardClick: () => {
    popupImage.open(cardItem);
  }
}, 'item');
  validationFormCard.disableButton();
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

validationFormProfile.enableValidation();
profileEditButton.addEventListener('click', handleClickOpenPopupProfile);

validationFormCard.enableValidation();
cardButton.addEventListener('click', () => cardPopup.open());
