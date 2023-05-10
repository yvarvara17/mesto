export default class Api {
  constructor() {
    this._token = 'ada12fec-7ba2-4bfb-af28-7a33b0f16c32';
  }

  getProfileInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
      headers: {
        authorization: this._token
      }
    })
  }
  getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
      headers: {
        authorization: this._token
      }
    })
  }
  setProfileInfo(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.profilename,
        about: data.profilejob
      })
    });
  }
  addCard(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }
  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-65/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    });
  }
  setLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-65/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    });
  }
  deleteLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-65/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    });
  }
  changeAvatar(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatarlink,
      })
    });
  }
}
