let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__form-input_type_name");
let jobInput = document.querySelector(".popup__form-input_type_job");
let title = document.querySelector(".profile__title");
let subtitle = document.querySelector(".profile__subtitle");
let modal = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close");
function openModal(){
  modal.classList.add("popup_opened");
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}
function closeModal(){
  modal.classList.remove("popup_opened");
}
function handleFormSubmit (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closeModal();
}
formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
