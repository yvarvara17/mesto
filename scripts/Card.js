class Card {
  constructor(card, templateSelector){
    this._image = card.link;
    this._name = card.name;
    this._template = document.getElementById(templateSelector);
  }

  _createCard(){
    const cardElement = this._template.content.cloneNode(true);
    const cardElementTitle = cardElement.querySelector('.element__title');
    const cardElementImg = cardElement.querySelector('.element__image');
    const cardElementLike = cardElement.querySelector('.element__like');
    const cardElementTrash = cardElement.querySelector('.element__trash');
    cardElementTitle.textContent = this._name;
    cardElementImg.src = this._image;
    cardElementImg.alt = this._name;

    this._setEventListeners(cardElementLike, cardElementTrash, cardElementImg);

    return cardElement;
  }

  _setEventListeners(cardElementLike, cardElementTrash, cardElementImg){
    const galleryPopup = document.querySelector('.gallery-popup');
    cardElementLike.addEventListener('click', this._setLike);
    cardElementTrash.addEventListener('click', this._removeCard);
    cardElementImg.addEventListener('click', () => {
      this._openPopup(galleryPopup);
      this._insertImageData(this, galleryPopup);
    });
  }

  _openPopup(elem){
    elem.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupOnKeyPress);
  }

  _closePopup(elem){
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupOnKeyPress);
  }

  _closePopupOnKeyPress(evt){
    const openedPopup = document.querySelector('.popup_opened');
    if(openedPopup !== null && evt.key === 'Escape'){
      this._closePopup(openedPopup);
    }
  }

  _insertImageData(card, galleryPopup){
    const galleryPopupImg = galleryPopup.querySelector('.gallery-popup__img');
    const galleryPopupTitle = galleryPopup.querySelector('.gallery-popup__title');
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

  renderItem(createdByButton){
    const itemListWrapper = document.querySelector('.elements');
    if(!createdByButton){
      itemListWrapper.append(this._createCard(this._name, this._link));
    }
    else{
      itemListWrapper.prepend(this._createCard(this._name, this._link));
    }
  }
}
export default Card;
