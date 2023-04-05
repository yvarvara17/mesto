import {enableButton, disableButton} from './index.js'

class FormValidator {

  constructor(validationConfig, formElement){
    this._validationConfig = validationConfig;
    this._inputSelector = validationConfig.inputSelector;
    this._errorClassTemplate = validationConfig.errorClassTemplate;
    this._activeErrorClass = validationConfig.activeErrorClass;
    this._validSubmitButtonClass = validationConfig.validSubmitButtonClass;
    this._errorInputClass = validationConfig.errorInputClass;
    this._form = document.forms[formElement];
    this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
    this._inputList = this._form.querySelectorAll(this._validationConfig.inputSelector);
  }

  enableValidation(){
    this._setEventListeners(this._form);
  }

  resetValidation = () => {
    this._inputList.forEach(input => this._hideInputError(input));
  }

  _checkInputValidityAndToggleButtonState = (input) => {
    this._checkInputValidity(input);
    this._toggleButtonState();
  }

  _setEventListeners = (form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    this._inputList.forEach((input) => {
        input.addEventListener('input', () => this._checkInputValidityAndToggleButtonState(input));
    });
  }
  _toggleButtonState = () => {
    if(this._hasInvalidInput()){
        disableButton(this._form);
    }
    else{
        enableButton(this._form);
    }
  }
  _checkInputValidity = (input) => {
    if(!input.validity.valid){
        this._showInputError(input.validationMessage, input);
    }
    else{
        this._hideInputError(input);
    }
  }
  _showInputError = (validationMessage, input) => {
    const errorTextElement = document.querySelector(`${this._errorClassTemplate}${input.name}`);
    errorTextElement.textContent = validationMessage;
    errorTextElement.classList.add(this._activeErrorClass);
    input.classList.add(this._errorInputClass);
  }

  _hideInputError = (input) => {
      const errorTextElement = document.querySelector(`${this._errorClassTemplate}${input.name}`);
      errorTextElement.textContent = '';
      errorTextElement.classList.remove(this._activeErrorClass);
      input.classList.remove(this._errorInputClass);
  }

  _hasInvalidInput = () => {
    return Array.from(this._inputList).some((input) => !input.validity.valid);
  }
}
export default FormValidator;
