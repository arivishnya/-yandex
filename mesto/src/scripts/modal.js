function openPopup(elem) {
  elem.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupWithEsc);
}

function closePopup(elem) {
  elem.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupWithEsc);
}

function closePopupWithEsc(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const popupElement = document.querySelector(".popup_is-opened");
    closePopup(popupElement);
  }
}

function closePopupWithOverlay(event, elem) {
  if (event.target === elem) {
    closePopup(elem);
  }
}

function setCloseModalByClickListeners(popupList) {
  popupList.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      closePopup(popup);
    });
    popup.addEventListener("click", (event) => {
      closePopupWithOverlay(event, popup);
    });
  });
}

export { openPopup, closePopup, setCloseModalByClickListeners };
