const forms = document.forms;

const showInputError = (errorTextElement, validationMessage, activeErrorClass, input) => {
    errorTextElement.textContent = validationMessage;
    errorTextElement.classList.add(activeErrorClass); 
    input.classList.add('popup__form-input_invalid');
}

const hideInputError = (errorTextElement, activeErrorClass, input) => {
    errorTextElement.textContent = '';
    errorTextElement.classList.remove(activeErrorClass);
    input.classList.remove('popup__form-input_invalid');
}

const disableButton = (submitButton, validSubmitButtonClass) => {
    submitButton.classList.remove(validSubmitButtonClass);
    submitButton.disabled = true;
}

const enableButton = (submitButton, validSubmitButtonClass) => {
    submitButton.classList.add(validSubmitButtonClass);
    submitButton.disabled = false;
}

const checkInputValidity = (input, errorClassTemplate, activeErrorClass) => {
    const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
    if(!input.validity.valid){
        showInputError(errorTextElement, input.validationMessage, activeErrorClass, input);
    }
    else{
        hideInputError(errorTextElement, activeErrorClass, input);
    }
}

const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((input) => !input.validity.valid);
}

const toggleButtonState = (submitButton, validSubmitButtonClass, inputList) => {
    if(hasInvalidInput(inputList)){
        disableButton(submitButton, validSubmitButtonClass);
    }
    else{
        enableButton(submitButton, validSubmitButtonClass);
    }
}

const setEventListeners = (form, inputList, {errorClassTemplate, activeErrorClass, validSubmitButtonClass}, submitButton) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    inputList.forEach((input) => {
        input.addEventListener('input', (e) => {
            checkInputValidity(input, errorClassTemplate, activeErrorClass);
            toggleButtonState(submitButton, validSubmitButtonClass, inputList);
        })
    });
}

const enableValidation = (formName, {inputSelector, submitButtonSelector, ...config}) => {
    const form = forms[formName];
    const inputList = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);

    setEventListeners(form, inputList, config, submitButton);
}
Array.from(forms).forEach((form) => {
    enableValidation(form.name, validationConfig)
});
