const openPopup = (elem) => {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnKeyPress);
}
const closePopup = (elem) => {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnKeyPress);
}
const closePopupOnKeyPress = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if(openedPopup !== null && evt.key === 'Escape'){
    closePopup(openedPopup);
  }
}
export {openPopup, closePopup}
