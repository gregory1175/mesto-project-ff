export {
        enableValidation,
        clearValidation
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
  };
  
  const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  
  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
  checkInputValidity(formElement, inputElement, settings);
  toggleButtonState(inputList, buttonElement, settings);
  });
  });
  };
  
  const checkInputValidity = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity("");
  }
  
  if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
  hideInputError(formElement, inputElement, settings);
  }
  };
  
  const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
  };
  
  const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
  } else {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
  }
  };

  const clearValidation = (formValidate, settings) => {
    const inputError = Array.from(formValidate.querySelectorAll(settings.inputSelector));
   
    inputError.forEach((inputElement) => {
        hideInputError(formValidate, inputElement, settings);
    });

    const formButtons = Array.from(formValidate.querySelectorAll('.popup__button')); 
    formButtons.forEach((button) => { 
      toggleButtonState(inputError, button, settings); 
  }); 
};

  const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  });
  const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
  fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet, settings);
  });
  });
  };
