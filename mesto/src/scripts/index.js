import "../pages/index.css";
import {
  getUser,
  getCards,
  changeUserInfo,
  addCard,
  changeUserAvatar,
  deleteCard,
} from "./api";
import { enableValidation, clearValidation } from "./validation";
import { openPopup, closePopup, setCloseModalByClickListeners } from "./modal";
import { createCard, deleteCardElement, toggleLikeCard } from "./card";

let userId;
let cardForDelete;

const page = document.querySelector(".page");
const cardsContainer = page.querySelector(".places__list");

const popups = {
  edit: page.querySelector(".popup_type_edit"),
  editAvatar: page.querySelector(".popup_type_edit-avatar-profile"),
  newCard: page.querySelector(".popup_type_new-card"),
  image: page.querySelector(".popup_type_image"),
  deleteCard: page.querySelector(".popup_type_delete-card"),
};

const popupButton = {
  edit: popups.edit.querySelector(".popup__button"),
  editAvatar: popups.editAvatar.querySelector(".popup__button"),
  newCard: popups.newCard.querySelector(".popup__button"),
};

const popupImage = {
  image: popups.image.querySelector(".popup__image"),
  caption: popups.image.querySelector(".popup__caption"),
};

const profile = {
  title: page.querySelector(".profile__title"),
  description: page.querySelector(".profile__description"),
  image: page.querySelector(".profile__image"),
};

const profileButton = {
  edit: page.querySelector(".profile__edit-button"),
  editImage: page.querySelector(".profile__image-button"),
  addCard: page.querySelector(".profile__add-button"),
};

const formEditProfile = document.forms["edit-profile"];
const { name: nameInput, description: jobInput } = formEditProfile;

const formEditAvatarProfile = document.forms["edit-avatar-profile"];
const { "edit-avatar-input": avatarInput } = formEditAvatarProfile;

const formNewPlace = document.forms["new-place"];
const { "place-name": placeNameInput, link: linkInput } = formNewPlace;

const formDeleteCard = document.forms["delete-card"];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-error_visible",
};

function handleError(error) {
  console.error(error);
}

function updateProfile({ name, about, avatar }) {
  if (name) profile.title.textContent = name;
  if (about) profile.description.textContent = about;
  if (avatar) profile.image.src = avatar;
}

function openPopupImage(event) {
  const card = event.target.parentElement;
  popupImage.image.src = event.target.src;
  popupImage.image.alt = event.target.alt;
  popupImage.caption.textContent =
    card.querySelector(".card__title").textContent;
  openPopup(popups.image);
}

function resetForm(form) {
  form.reset();
}

function handleFormEditProfileSubmit(event) {
  event.preventDefault();

  const defaultSubmitButtonText = popupButton.edit.textContent;
  changeTextFormButton(popupButton.edit);

  changeUserInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((user) => {
      updateProfile(user);
      closePopup(popups.edit);
    })
    .catch(handleError)
    .finally(() => {
      changeTextFormButton(popupButton, defaultSubmitButtonText);
    });
}

function handleFormEditAvatarProfileSubmit(event) {
  event.preventDefault();

  const defaultSubmitButtonText = popupButton.editAvatar.textContent;
  changeTextFormButton(popupButton.editAvatar);

  changeUserAvatar({
    avatar: avatarInput.value,
  })
    .then((user) => {
      updateProfile(user);
      closePopup(popups.editAvatar);
    })
    .catch(handleError)
    .finally(() => {
      changeTextFormButton(popupButton, defaultSubmitButtonText);
    });
}

function handleFormNewPlaceSubmit(event) {
  event.preventDefault();

  const defaultSubmitButtonText = popupButton.newCard.textContent;
  changeTextFormButton(popupButton.newCard);

  addCard({
    name: placeNameInput.value,
    link: linkInput.value,
  })
    .then((newCard) => {
      cardsContainer.prepend(
        createCard(
          userId,
          newCard,
          openCardDeleteConfirmationPopup,
          openPopupImage,
          toggleLikeCard
        )
      );
      resetForm(formNewPlace);
      clearValidation(formNewPlace, validationConfig);
      closePopup(popups.newCard);
    })
    .catch(handleError)
    .finally(() => {
      changeTextFormButton(popupButton, defaultSubmitButtonText);
    });
}

function handleFormDeleteCardSubmit(event) {
  event.preventDefault();
  deleteCard(cardForDelete.id)
    .then(() => {
      deleteCardElement(cardForDelete.element);
      cardForDelete = {};
      closePopup(popups.deleteCard);
    })
    .catch(handleError);
}

function openCardDeleteConfirmationPopup(id, element) {
  cardForDelete = {
    id,
    element,
  };
  openPopup(popups.deleteCard);
}

function changeTextFormButton(popupButton, defaultText) {
  popupButton.textContent = defaultText || "Сохранение...";
}

function handleProfileEditButtonClick(event) {
  event.preventDefault();
  nameInput.value = profile.title.textContent;
  jobInput.value = profile.description.textContent;
  clearValidation(formEditProfile, validationConfig, false);
  openPopup(popups.edit);
}

function handleProfileImageButtonClick(event) {
  event.preventDefault();
  resetForm(formEditAvatarProfile);
  clearValidation(formEditAvatarProfile, validationConfig);
  openPopup(popups.editAvatar);
}

function handleProfileAddButtonClick(event) {
  event.preventDefault();
  openPopup(popups.newCard);
}

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formEditAvatarProfile.addEventListener(
  "submit",
  handleFormEditAvatarProfileSubmit
);
formNewPlace.addEventListener("submit", handleFormNewPlaceSubmit);
formDeleteCard.addEventListener("submit", handleFormDeleteCardSubmit);

profileButton.edit.addEventListener("click", handleProfileEditButtonClick);
profileButton.editImage.addEventListener(
  "click",
  handleProfileImageButtonClick
);
profileButton.addCard.addEventListener("click", handleProfileAddButtonClick);

setCloseModalByClickListeners(page.querySelectorAll(".popup"));
enableValidation(validationConfig);

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    userId = user._id;
    updateProfile(user);
    cards.forEach((card) => {
      cardsContainer.append(
        createCard(
          userId,
          card,
          openCardDeleteConfirmationPopup,
          openPopupImage,
          toggleLikeCard
        )
      );
    });
  })
  .catch(handleError);
