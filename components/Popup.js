export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._button = this._popup.querySelector('.popup__close');
  }
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
  _handleEscClose(evt){
    if(this._popup.classList.contains('popup_opened')){
      if(evt.key === 'Escape'){
        this.close();
      }
    }
  }
  setEventListeners(){
    this._button.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget){
        this.close(evt.currentTarget);
      }
    });
  }
}
