import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import validationConfig from '../constants/constants.js';
import Api from '../components/Api.js';
import './index.css';

const forms = document.forms;
const profileForm = forms['profile-form'];
const profileEditButton = document.querySelector('.profile__edit-button');
const cardButton = document.querySelector('.profile__add-button');
const validationFormProfile = new FormValidator(validationConfig, 'profile-form');
const validationFormCard = new FormValidator(validationConfig, 'card-form');
const validationFormAvatar = new FormValidator(validationConfig, 'avatar-edit-form');
const profileNameInput = profileForm.querySelector('.profile-name-input');
const profileJobInput = profileForm.querySelector('.profile-job-input');
const userInfo = new UserInfo({ name: '.profile__title', job: '.profile__subtitle', avatar: '.profile__avatar' });
const avatarOverlay = document.querySelector('.profile__overlay');
let cardsList = new Object();

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-65');

const getCardsFromServer = (action, cardData, card) => {
  Promise.all([
    api.getProfileInfo()
      .catch((err) => {
        console.log(err);
      }),

    api.getCards()
      .catch((err) => {
        console.log(err);
      })
  ])

    .then((values) => {
      userInfo.setUserInfo({ profilename: values[0].name, profilejob: values[0].about, avatar: values[0].avatar, myId: values[0]._id });
      if (action === 'render') {
        cardsList = new Section({
          data: values[1],
          renderer: (cardItem) => {
            const cardElement = createCardWithListener(cardItem);
            cardsList.addItem(cardElement, false);
          }
        },
          '.elements'
        );
        cardsList.renderItems();

      }
      else if (action === 'add') {
        cardsList.addItem(createCardWithListener(cardData), true);
      }
      else {
        card.removeCard();
      }
    })
    .catch((err) => {
      console.log(err);
    })
}
getCardsFromServer('render', null, null);

const getLikesFromServer = (cardData, card) => {
  card.likeIsSet = !card.likeIsSet;
  if (card.likeIsSet) {
    api.setLike(cardData._id)
      .then(res => {
        card.refreshLikes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    api.deleteLike(cardData._id)
      .then(res => {
        card.refreshLikes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
const renderLoading = (buttonSelector, saveFlag) => {
  const button = document.querySelector(buttonSelector);
  button.textContent = saveFlag ? "Сохранение..." : "Сохранить";
}

const profilePopup = new PopupWithForm({
  selector: '.profile-popup', handleFormSubmit: (data) => {
    renderLoading('.profile-submit', true);
    api.setProfileInfo(data)
      .then(res => {
        userInfo.setUserInfo({ profilename: res.name, profilejob: res.about, avatar: res.avatar, myId: res._id });
      })
      .then(res => {
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading('.profile-submit', false);
    });
  }
});
profilePopup.setEventListeners();
const cardPopup = new PopupWithForm({
  selector: '.card-popup', handleFormSubmit: (data) => {
    renderLoading('.card-submit', true);
    api.addCard(data)
      .then(res => {
        getCardsFromServer('add', res, null);
      })
      .then(res => {
        cardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading('.card-submit', false);
    });
  }
});
cardPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm({
  selector: '.avatar-edit-popup', handleFormSubmit: (data) => {
    renderLoading('.avatar-edit-submit', true);
    api.changeAvatar(data)
      .then(res => {
        userInfo.setUserInfo({ profilename: res.name, profilejob: res.about, avatar: res.avatar, myId: res._id });
      })
      .then(res => avatarEditPopup.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading('.avatar-edit-submit', false);
    });
  }
});
avatarEditPopup.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation({
  selector: '.confirmation-popup', handleFormSubmit: (data) => {
    api.deleteCard(data)
      .then(res => getCardsFromServer('remove', data, popupWithConfirmation.card))
      .then(res => popupWithConfirmation.close())
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
      popupWithConfirmation.open(cardItem, card);
    }, handleLikeClick: () => {
      getLikesFromServer(cardItem, card);
    },
    userInfo,
  }, 'item');
  return card.createCard();
}

validationFormProfile.enableValidation();
profileEditButton.addEventListener('click', handleClickOpenPopupProfile);

validationFormCard.enableValidation();
cardButton.addEventListener('click', handleClickOpenPopupCard);

validationFormAvatar.enableValidation();
avatarOverlay.addEventListener('click', handleClickOpenPopupAvatar);
