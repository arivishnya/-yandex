import { addCardLike, deleteCardLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  userId,
  { link, name, owner, _id, likes },
  deletedCardFunction,
  openPopupImageFunction,
  toggleLikeCard
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  const cardDeleteElement = cardElement.querySelector(".card__delete-button");
  if (userId !== owner._id) {
    cardDeleteElement.style.display = "none";
  } else {
    cardDeleteElement.addEventListener("click", () =>
      deletedCardFunction(_id, cardElement)
    );
  }

  cardElement.querySelector(".card__like-text").textContent = likes.length;

  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");
  const isLiked = likes.some((user) => user._id == userId);
  if (isLiked) {
    cardLikeButtonElement.classList.add("card__like-button_is-active");
  }

  cardLikeButtonElement.addEventListener("click", (event) =>
    toggleLikeCard(event, _id, cardElement)
  );

  cardImage.addEventListener("click", openPopupImageFunction);

  return cardElement;
}

function deleteCardElement(cardElement) {
  cardElement.remove();
}

function toggleLikeCard(event, cardId, cardElement) {
  const likeButton = event.target;
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const updateLikes = (card) => {
    const likesCount = card.likes.length;
    cardElement.querySelector(".card__like-text").textContent = likesCount;
    likeButton.classList.toggle("card__like-button_is-active", !isLiked);
  };

  if (isLiked) {
    deleteCardLike(cardId)
      .then((updatedCard) => updateLikes(updatedCard))
      .catch((error) => console.error(error));
  } else {
    addCardLike(cardId)
      .then((updatedCard) => updateLikes(updatedCard))
      .catch((error) => console.error(error));
  }
}

export { createCard, deleteCardElement, toggleLikeCard };
