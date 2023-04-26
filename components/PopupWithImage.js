import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popup = document.querySelector(selector);
    this._galleryPopupImg = this._popup.querySelector('.gallery-popup__img');
    this._galleryPopupTitle = this._popup.querySelector('.gallery-popup__title');
  }
  open(card){
    super.open();
    this._galleryPopupImg.src = card.link;
    this._galleryPopupImg.alt = card.name;
    this._galleryPopupTitle.textContent = card.name;
  }
}
