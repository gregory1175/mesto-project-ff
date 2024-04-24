export {
        enableValidation,
        clearValidation
}

// formValidate  
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__message-error-active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('popup__message-error-active');
    errorElement.textContent = '';
  };
    
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button'); 
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
     
  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("")
    }

    if (!inputElement.validity.valid) {        
    showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
    hideInputError(formElement, inputElement);
    }
    }; 

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
  }

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-inactive');
    buttonElement.setAttribute('disabled', 'disabled');
    } else {
    buttonElement.classList.remove('popup__button-inactive');
    buttonElement.removeAttribute('disabled');
    }
    }

  const clearValidation = (formElement) => {
    const inputError = Array.from(formElement.querySelectorAll('.popup__input'))
    const formButtons = Array.from(formElement.querySelectorAll('.popup__button'))
    inputError.forEach((spanText) => {
      hideInputError(formElement, spanText)
    });
    formButtons.forEach((button) => {
     toggleButtonState(inputError, button)
    })
  }

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
    });
    }