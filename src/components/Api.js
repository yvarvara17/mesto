export default class Api {
  constructor(url) {
    this._token = 'ada12fec-7ba2-4bfb-af28-7a33b0f16c32';
    this._url = url;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._getResponseData(res));
  }
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._getResponseData(res));
  }
  setProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.profilename,
        about: data.profilejob
      })
    })
    .then(res => this._getResponseData(res));
  }
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._getResponseData(res));
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => this._getResponseData(res));
  }
  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => this._getResponseData(res));
  }
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(res => this._getResponseData(res));
  }
  changeAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatarlink,
      })
    })
    .then(res => this._getResponseData(res));
  }
}
