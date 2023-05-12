class Card {
  constructor({ cardItem, handleCardClick, handleTrashClick, handleLikeClick, userInfo }, templateSelector) {
    this._image = cardItem.link;
    this._name = cardItem.name;
    this._likes = cardItem.likes;
    this._ownerId = cardItem.owner._id;
    this._template = document.getElementById(templateSelector);
    this.handleCardClick = handleCardClick;
    this.handleTrashClick = handleTrashClick;
    this.handleLikeClick = handleLikeClick;
    this._myId = userInfo.myId;
    this.id = cardItem._id;
    this.likeIsSet = this._likes.some(i => i._id === this._myId);
  }

  _getTemplate() {
    const cardElement = this._template
      .content
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like')
      .addEventListener('click', (e) => this.handleLikeClick(e));

    this._element.querySelector('.element__trash')
      .addEventListener('click', () => this.handleTrashClick(this.id));

    this._element.querySelector('.element__image')
      .addEventListener('click', () => this.handleCardClick());
  }

  createCard = () => {
    this._element = this._getTemplate();
    this._cardElementLi = this._element.querySelector('.element');
    const cardElementTitle = this._element.querySelector('.element__title');
    const cardElementImg = this._element.querySelector('.element__image');
    this._cardElementLikeNumber = this._element.querySelector('.element__like-number');
    this._like = this._element.querySelector('.element__like');
    const cardElementTrash = this._element.querySelector('.element__trash');
    const cardElementLike = this._element.querySelector('.element__like');
    if (this._ownerId !== this._myId) {
      cardElementTrash.style.display = 'none';
    }
    if (this.likeIsSet) {
      cardElementLike.classList.add('element__like_checked');
    }
    cardElementTitle.textContent = this._name;
    cardElementImg.src = this._image;
    cardElementImg.alt = this._name;
    this._cardElementLikeNumber.textContent = this._likes?.length ? this._likes.length : 0;
    this._cardElementLi.id = this.id;
    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._cardElementLi.remove();
  }

  refreshLikes(cardItem) {
    this._cardElementLikeNumber.textContent = cardItem.likes?.length ? cardItem.likes.length : 0;
    this._like.classList.toggle('element__like_checked');
  }
}
export default Card;
