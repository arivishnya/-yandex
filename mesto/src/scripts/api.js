const token = "a0036ef3-200a-495e-9686-79f48f6c8df6";
const cohort = "wff-cohort-10";

const config = {
  headers: {
    authorization: token,
  },
  headersWithContentType: {
    authorization: token,
    "Content-Type": "application/json",
  },
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
  editBaseUrl: `https://nomoreparties.co/v1/${cohort}`,
};

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
}

function changeUserInfo(data) {
  return fetch(`${config.editBaseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headersWithContentType,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

function addCard(data) {
  return fetch(`${config.editBaseUrl}/cards`, {
    method: "POST",
    headers: config.headersWithContentType,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

function deleteCard(cardId) {
  return fetch(`${config.editBaseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

function addCardLike(cardId) {
  return fetch(`${config.editBaseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
}

function deleteCardLike(cardId) {
  return fetch(`${config.editBaseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

function changeUserAvatar(data) {
  return fetch(`${config.editBaseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headersWithContentType,
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export {
  getUser,
  getCards,
  changeUserInfo,
  addCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
  changeUserAvatar,
};
