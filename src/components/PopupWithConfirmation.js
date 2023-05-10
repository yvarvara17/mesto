import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
    this.handleFormSubmit = handleFormSubmit;
    this.cardId = '';
  }
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('click', () => {
      this.handleFormSubmit(this.cardId);
      this.close();
    })
  }
  open(card){
    super.open();
    this.cardId = card._id;
  }
  close(){
    super.close();
  }
}
