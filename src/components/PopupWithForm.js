import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this.handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__form-input');
  }
  _getInputValues(){
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this.handleFormSubmit(this._getInputValues());
      this.close();
    })
  }
  close(){
    super.close();
    this._form.reset();
  }
}
