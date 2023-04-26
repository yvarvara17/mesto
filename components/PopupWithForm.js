import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._popup = document.querySelector(selector);
    this.handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this.selector = selector;
  }
  _getInputValues(){
    const formValues = {};
    if(this.selector == '.card-popup'){
      formValues.name = this._form.querySelector('.card-name-input').value;
      formValues.link = this._form.querySelector('.card-link-input').value;
    }
    else if(this.selector == '.profile-popup'){
      formValues.name = this._form.querySelector('.profile-name-input').value;
      formValues.job = this._form.querySelector('.profile-job-input').value;
    }
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
