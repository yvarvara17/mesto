import {openPopup} from './utils.js'

class Card {
  constructor(card, templateSelector){
    this._image = card.link;
    this._name = card.name;
    this._template = document.getElementById(templateSelector);
    this._galleryPopup = document.querySelector('.gallery-popup');
  }

_getTemplate() {
  const cardElement = this._template
    .content
    .cloneNode(true);

  return cardElement;
  }

_setEventListeners() {
  this._element.querySelector('.element__like')
  .addEventListener('click', (e) => this._setLike(e));

  this._element.querySelector('.element__trash')
  .addEventListener('click', (e) => this._removeCard(e));

  this._element.querySelector('.element__image')
  .addEventListener('click', () => this._openPopupAndInsertImageData());
  }

createCard = () => {
    this._element = this._getTemplate();
    const cardElementTitle = this._element.querySelector('.element__title');
    const cardElementImg = this._element.querySelector('.element__image');
    cardElementTitle.textContent = this._name;
    cardElementImg.src = this._image;
    cardElementImg.alt = this._name;
    this._setEventListeners();

    return this._element;
  }

  _openPopupAndInsertImageData = () => {
    openPopup(this._galleryPopup);
    this._insertImageData(this);
  }

  _insertImageData(card){
    const galleryPopupImg = this._galleryPopup.querySelector('.gallery-popup__img');
    const galleryPopupTitle = this._galleryPopup.querySelector('.gallery-popup__title');
    galleryPopupImg.src = card._image;
    galleryPopupImg.alt = card._name;
    galleryPopupTitle.textContent = card._name;
  }

  _setLike(e){
    e.target.classList.toggle('element__like_checked');
  }

  _removeCard(e){
    e.target.closest('.element').remove();
  }
}
export default Card;
