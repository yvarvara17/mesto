import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
    this.handleFormSubmit = handleFormSubmit;
    this.cardId = '';
    this.card = new Object;
  }
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('click', () => {
      this.handleFormSubmit(this.cardId);
    })
  }
  open(cardData, card){
    super.open();
    this.cardId = cardData._id;
    this.card = card;
  }
  close(){
    super.close();
  }
}
