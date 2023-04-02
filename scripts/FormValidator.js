import addCard from './index.js';

class FormValidator {

  constructor(validationConfig, formElement){
    this._validationConfig = validationConfig;
    this._form = document.forms[formElement];
  }

  _handleFormSubmitProfile = (evt) => {
    evt.preventDefault();
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    const profileNameInput = document.querySelector('.profile-name-input');
    const profileJobInput = document.querySelector('.profile-job-input');
    const profilePopup = document.querySelector('.profile-popup');
    profileTitle.textContent = profileNameInput.value;
    profileSubtitle.textContent = profileJobInput.value;
    this._closePopup(profilePopup);
    this._disableButton(evt.target.querySelector(validationConfig.submitButtonSelector), validationConfig.validSubmitButtonClass);
  }
  _handleFormSubmitCard = (evt) => {
    evt.preventDefault();
    const cardNameInput = document.querySelector('.card-name-input');
    const cardLinkInput = document.querySelector('.card-link-input');
    const cardPopup = document.querySelector('.card-popup');
    addCard({name: cardNameInput.value, link: cardLinkInput.value}, 'item').renderItem(true);
    this._closePopup(cardPopup);
    this._form.reset();
    this._disableButton(evt.target.querySelector(validationConfig.submitButtonSelector), validationConfig.validSubmitButtonClass);
  }
  enableValidation(){

    const inputList = this._form.querySelectorAll(this._validationConfig.inputSelector);
    const submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);

    this._setEventListeners(this._form, inputList, this._validationConfig, submitButton);
  }
  _setEventListeners = (form, inputList, {errorClassTemplate, activeErrorClass, validSubmitButtonClass, errorInputClass}, submitButton) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    inputList.forEach((input) => {
        input.addEventListener('input', (e) => {
            this._checkInputValidity(input, errorClassTemplate, activeErrorClass, errorInputClass);
            this._toggleButtonState(submitButton, validSubmitButtonClass, inputList);
        })
    });

    if(form.name == 'profile-form'){
      const profileEditButton = document.querySelector('.profile__edit-button');
      const profileNameInput = this._form.querySelector('.profile-name-input');
      const profileJobInput = this._form.querySelector('.profile-job-input');
      const profilePopup = document.querySelector('.profile-popup');
      const profileTitle = document.querySelector('.profile__title');
      const profileSubtitle = document.querySelector('.profile__subtitle');
      this._form.addEventListener('submit', this._handleFormSubmitProfile);
      profileEditButton.addEventListener('click', () => {
      this._openPopup(profilePopup);
      profileNameInput.value = profileTitle.textContent;
      profileJobInput.value = profileSubtitle.textContent;
    });
    }
    else if(form.name == 'card-form'){
      const cardButton = document.querySelector('.profile__add-button');
      const cardPopup = document.querySelector('.card-popup');
      this._form.addEventListener('submit', this._handleFormSubmitCard);
      cardButton.addEventListener('click', () => this._openPopup(cardPopup));
    }
  }
  _toggleButtonState = (submitButton, validSubmitButtonClass, inputList) => {
    if(this._hasInvalidInput(inputList)){
        this._disableButton(submitButton, validSubmitButtonClass);
    }
    else{
        this._enableButton(submitButton, validSubmitButtonClass);
    }
  }
  _checkInputValidity = (input, errorClassTemplate, activeErrorClass, errorInputClass) => {
    const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
    if(!input.validity.valid){
        this._showInputError(errorTextElement, input.validationMessage, activeErrorClass, input, errorInputClass);
    }
    else{
        this._hideInputError(errorTextElement, activeErrorClass, input, errorInputClass);
    }
  }
  _showInputError = (errorTextElement, validationMessage, activeErrorClass, input, errorInputClass) => {
    errorTextElement.textContent = validationMessage;
    errorTextElement.classList.add(activeErrorClass);
    input.classList.add(errorInputClass);
  }

  _hideInputError = (errorTextElement, activeErrorClass, input, errorInputClass) => {
      errorTextElement.textContent = '';
      errorTextElement.classList.remove(activeErrorClass);
      input.classList.remove(errorInputClass);
    }

  _disableButton = (submitButton, validSubmitButtonClass) => {
      submitButton.classList.remove(validSubmitButtonClass);
      submitButton.disabled = true;
    }

  _enableButton = (submitButton, validSubmitButtonClass) => {
      submitButton.classList.add(validSubmitButtonClass);
      submitButton.disabled = false;
    }
  _hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((input) => !input.validity.valid);
    }
  _openPopup(elem){
    elem.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupOnKeyPress);
  }
  _closePopup(elem){
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupOnKeyPress);
  }
  _closePopupOnKeyPress = (evt) => {
    const openedPopup = document.querySelector('.popup_opened');
    if(openedPopup !== null && evt.key === 'Escape'){
      this._closePopup(openedPopup);
    }
  }
}
export default FormValidator;
