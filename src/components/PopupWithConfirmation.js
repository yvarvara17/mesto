import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
    this.handleFormSubmit = handleFormSubmit;
  }
  setSubmitAction(cardItem, card){
    this._form.addEventListener('click', () => {
      this.handleFormSubmit(cardItem, card);
    })
  }
  close() {
    super.close();
  }
}
