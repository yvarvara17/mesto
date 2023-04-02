import Card from './Card.js';
import initialCards from './cards.js';
import FormValidator from './FormValidator.js';

const forms = document.forms;
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

function closePopupOnKeyPress(evt){
  const openedPopup = document.querySelector('.popup_opened');
  if(openedPopup !== null && evt.key === 'Escape'){
    closePopup(openedPopup);
  }
}
function closePopup(elem){
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnKeyPress);
}

const addCard = (card, templateSelector) => {
  return new Card(card, templateSelector);
}

initialCards.forEach((card) => {
  addCard(card, 'item').renderItem(false);
});

Array.from(forms).forEach((form) => {
  new FormValidator(validationConfig, form.name).enableValidation();
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

Array.from(popups).forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if(evt.target === evt.currentTarget){
        closePopup(evt.currentTarget)
    }
  });
});

export default addCard;
