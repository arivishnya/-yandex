function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, {
      inputSelector,
      submitButtonSelector,
      inputErrorClass,
      errorClass,
    });
  });
}

function clearValidation(
  form,
  { inputSelector, inputErrorClass, errorClass, submitButtonSelector },
  buttonDisabled = true
) {
  hideAllInputError(form, {
    inputSelector,
    inputErrorClass,
    errorClass,
  });

  const buttonElement = form.querySelector(submitButtonSelector);
  buttonElement.disabled = buttonDisabled;
}

function setEventListeners(
  formElement,
  { inputSelector, submitButtonSelector, inputErrorClass, errorClass }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, {
        inputErrorClass,
        errorClass,
      });
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function hideAllInputError(
  formElement,
  { inputSelector, inputErrorClass, errorClass }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function checkInputValidity(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.patternErrorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    showInputError(formElement, inputElement, inputElement.validationMessage, {
      inputErrorClass,
      errorClass,
    });
  } else {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  }
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  inputElement.classList.add(inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  inputElement.classList.remove(inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

export { enableValidation, clearValidation };
