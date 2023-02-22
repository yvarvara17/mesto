let modal = document.querySelector(".popup");
function openModal(){
  modal.classList.add("popup_opened");
}
function closeModal(){
  modal.classList.remove("popup_opened");
}
let editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", openModal);
let closeButton = document.querySelector(".popup__close");
closeButton.addEventListener("click", closeModal);
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__form-name-input");
let jobInput = document.querySelector(".popup__form-job-input");
function handleFormSubmit (evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;
  let title = document.querySelector(".profile__title");
  let subtitle = document.querySelector(".profile__subtitle");
  title.textContent = name;
  subtitle.textContent = job;
  closeModal();
}
formElement.addEventListener('submit', handleFormSubmit);
