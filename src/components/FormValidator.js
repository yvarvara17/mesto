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
    this._setEventListeners();
  }

  resetValidation = () => {
    this._inputList.forEach(input => this._hideInputError(input));
  }

  disableButton = () => {
    this._submitButton.classList.remove(this._validSubmitButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton = () => {
    this._submitButton.classList.add(this._validSubmitButtonClass);
    this._submitButton.disabled = false;
  }

  _checkInputValidityAndToggleButtonState = (input) => {
    this._checkInputValidity(input);
    this._toggleButtonState();
  }

  _setEventListeners = () => {
    this._form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    this._inputList.forEach((input) => {
        input.addEventListener('input', () => this._checkInputValidityAndToggleButtonState(input));
    });
  }
  _toggleButtonState = () => {
    if(this._hasInvalidInput()){
        this.disableButton();
    }
    else{
        this.enableButton();
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
