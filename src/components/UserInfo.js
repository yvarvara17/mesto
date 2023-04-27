export default class UserInfo {
  constructor({ name: nameSelector, job: jobSelector }) {
    this._profileTitle = document.querySelector(nameSelector);
    this._profileSubtitle = document.querySelector(jobSelector);
  }
  getUserInfo(){
    return { profilename: this._profileTitle.textContent, profilejob: this._profileSubtitle.textContent }
  }
  setUserInfo(data){
    this._profileTitle.textContent = data.profilename;
    this._profileSubtitle.textContent = data.profilejob;
  }
}
