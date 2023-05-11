export default class UserInfo {
  constructor({ name: nameSelector, job: jobSelector, avatar: avatarSelector, myId: myId }) {
    this._profileTitle = document.querySelector(nameSelector);
    this._profileSubtitle = document.querySelector(jobSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
    this.myId = myId;
  }
  getUserInfo() {
    return { profilename: this._profileTitle.textContent, profilejob: this._profileSubtitle.textContent }
  }
  setUserInfo(data) {
    this._profileTitle.textContent = data.profilename;
    this._profileSubtitle.textContent = data.profilejob;
    this._profileAvatar.src = data.avatar;
    this._profileAvatar.alt = data.profilename;
    this.myId = data.myId;
  }
}
