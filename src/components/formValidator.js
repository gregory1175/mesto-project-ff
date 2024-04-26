  // Отображение ошибки валидации
  const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

// скрыть ошибки валидации 
const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

// проверим наличие невалидного поля   
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// отключенная кнопка 
const disableSubmitButton = (buttonElement, settings) => {
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add(settings.inactiveButtonClass);
};

// состояние кнопки 
const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, settings)
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};

// проверяем валидность полей 
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

// добавляем слушатель 
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};
// подключаем валидацию ко всем формам 
const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
}

// очищаем ошибки валидации и делаем кнопку неактивной 
const clearValidation = (formElement, settings) => {
    const inputElements = formElement.querySelectorAll(
        settings.inputSelector
    );
    const buttonElement = formElement.querySelector(
        settings.submitButtonSelector
    );

    inputElements.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
    });
    disableSubmitButton(buttonElement, settings);
}

export {
    enableValidation,
    clearValidation
}