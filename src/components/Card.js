class Card {
  constructor({ cardItem, handleCardClick }, templateSelector){
    this._image = cardItem.link;
    this._name = cardItem.name;
    this._template = document.getElementById(templateSelector);
    this._galleryPopup = document.querySelector('.gallery-popup');
    this._galleryPopupImg = this._galleryPopup.querySelector('.gallery-popup__img');
    this._galleryPopupTitle = this._galleryPopup.querySelector('.gallery-popup__title');
    this.handleCardClick = handleCardClick;
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
  .addEventListener('click', () => this.handleCardClick());
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

  _setLike(e){
    e.target.classList.toggle('element__like_checked');
  }

  _removeCard(e){
    e.target.closest('.element').remove();
  }
}
export default Card;
