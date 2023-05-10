import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import validationConfig from '../components/constants/constants.js';
import Api from '../components/Api.js';
import './index.css';

const api = new Api();
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
api.getProfileInfo()
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    profileTitle.textContent = res.name;
    profileSubtitle.textContent = res.about;
    profileAvatar.src = res.avatar;
    profileAvatar.alt = res.name;
  })
  .catch((err) => {
    console.log(err);
  });
const getCardsFromServer = (action, cardData) => {
  api.getCards()
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
      const cardsList = new Section({
        data: res,
        renderer: (cardItem) => {
          const cardElement = createCardWithListener(cardItem);
          cardsList.addItem(cardElement, false);//
        }
      },
        '.elements'
      );
      if (action == 'render') {
        cardsList.renderItems();
      }
      else if (action == 'add') {
        cardsList.addItem(createCardWithListener(cardData), true);
      }
      else {
        cardsList.removeItem(cardData);
      }
    })
    .then(res => { return res })
    .catch((err) => {
      console.log(err);
    });
}
getCardsFromServer('render', null);

const refreshLikes = (cardItem) => {
  const card = document.getElementById(cardItem._id);
  const cardLikeNumber = card.querySelector('.element__like-number');
  cardLikeNumber.textContent = cardItem.likes !== [] ? cardItem.likes.length : 0;
}

const getLikesFromServer = (cardData, likeIsSet) => {
  if (likeIsSet) {
    api.setLike(cardData._id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        refreshLikes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    api.deleteLike(cardData._id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        refreshLikes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const forms = document.forms;
const profileForm = forms['profile-form'];
const profileEditButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const validationFormProfile = new FormValidator(validationConfig, 'profile-form');
const validationFormCard = new FormValidator(validationConfig, 'card-form');
const validationFormAvatar = new FormValidator(validationConfig, 'avatar-edit-form');
const profileNameInput = profileForm.querySelector('.profile-name-input');
const profileJobInput = profileForm.querySelector('.profile-job-input');
const userInfo = new UserInfo({ name: '.profile__title', job: '.profile__subtitle' });
const avatarOverlay = document.querySelector('.profile__overlay');
const avatar = document.querySelector('.profile__avatar');

const profilePopup = new PopupWithForm({
  selector: '.profile-popup', handleFormSubmit: (data) => {
    const saveButton = document.querySelector('.profile-submit');
    saveButton.textContent = "Сохранение...";
    api.setProfileInfo(data)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        userInfo.setUserInfo({ profilename: res.name, profilejob: res.about });
      })
      .then(res => {
        profilePopup.close();
        saveButton.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      })
  }
});
profilePopup.setEventListeners();
const cardPopup = new PopupWithForm({
  selector: '.card-popup', handleFormSubmit: (data) => {
    const saveButton = document.querySelector('.card-submit');
    saveButton.textContent = "Сохранение...";
    api.addCard(data)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        getCardsFromServer('add', res);
      })
      .then(res => {
        cardPopup.close();
        saveButton.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      })
  }
});
cardPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm({
  selector: '.avatar-edit-popup', handleFormSubmit: (data) => {
    const saveButton = document.querySelector('.avatar-edit__form-submit');
    saveButton.textContent = "Сохранение...";
    api.changeAvatar(data)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        avatar.src = res.avatar;
      })
      .then(res => {
        avatarEditPopup.close();
        saveButton.textContent = "Сохранить";
      })
      .catch((err) => {
        console.log(err);
      })
  }
});
avatarEditPopup.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation({
  selector: '.confirmation-popup', handleFormSubmit: (data) => {
    api.deleteCard(data)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(getCardsFromServer('remove', data))
      .catch((err) => {
        console.log(err);
      })
  }
});
popupWithConfirmation.setEventListeners();

const popupImage = new PopupWithImage('.gallery-popup');
popupImage.setEventListeners();

const handleClickOpenPopupProfile = () => {
  const savedUserData = userInfo.getUserInfo();
  profileNameInput.value = savedUserData.profilename;
  profileJobInput.value = savedUserData.profilejob;
  validationFormProfile.resetValidation();
  profilePopup.open();
}

const handleClickOpenPopupCard = () => {
  validationFormCard.resetValidation();
  validationFormCard.disableButton();
  cardPopup.open();
}

const handleClickOpenPopupAvatar = () => {
  validationFormAvatar.resetValidation();
  validationFormAvatar.disableButton();
  avatarEditPopup.open();
}

const createCardWithListener = (cardItem) => {
  const card = new Card({
    cardItem, handleCardClick: () => {
      popupImage.open(cardItem);
    }, handleTrashClick: () => {
      popupWithConfirmation.open(cardItem);
    }, handleLikeClick: () => {
      getLikesFromServer(cardItem, card.likeIsSet);
    }
  }, 'item');
  return card.createCard();
}

validationFormProfile.enableValidation();
profileEditButton.addEventListener('click', handleClickOpenPopupProfile);

validationFormCard.enableValidation();
cardButton.addEventListener('click', handleClickOpenPopupCard);

validationFormAvatar.enableValidation();
avatarOverlay.addEventListener('click', handleClickOpenPopupAvatar);
