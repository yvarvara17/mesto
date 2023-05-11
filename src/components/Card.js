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
    if (this._likes.find(i => i._id === this._myId) == undefined) {
      this.likeIsSet = false;
    }
    else {
      this.likeIsSet = true;
    }
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
    const cardElementLi = this._element.querySelector('.element');
    const cardElementTitle = this._element.querySelector('.element__title');
    const cardElementImg = this._element.querySelector('.element__image');
    const cardElementLikeNumber = this._element.querySelector('.element__like-number');
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
    cardElementLikeNumber.textContent = this._likes !== [] ? this._likes.length : 0;
    cardElementLi.id = this.id;
    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    document.getElementById(this.id).remove();
  }

  refreshLikes(cardItem){
    const cardElement = document.getElementById(this.id);
    const cardLikeNumber = cardElement.querySelector('.element__like-number');
    const like = cardElement.querySelector('.element__like');
    cardLikeNumber.textContent = cardItem.likes !== [] ? cardItem.likes.length : 0;
    like.classList.toggle('element__like_checked');
  }
}
export default Card;
