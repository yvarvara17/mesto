export default class UserInfo {
  constructor({ name: nameSelector, job: jobSelector }) {
    this._name = document.querySelector(nameSelector).value;
    this._job = document.querySelector(jobSelector).value;
    this._profileTitle = document.querySelector('.profile__title');
    this._profileSubtitle = document.querySelector('.profile__subtitle');
  }
  getUserInfo(){
    return { name: this._profileTitle.textContent, job: this._profileSubtitle.textContent }
  }
  setUserInfo(data){
    this._profileTitle.textContent = data.name;
    this._profileSubtitle.textContent = data.job;
  }
}
