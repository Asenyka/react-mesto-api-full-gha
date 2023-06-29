const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "input_type_error",
  errorClass: ".popup__error",
};

const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
const formEditProfile = document.querySelector(".popup__form_edit");
const formElementCreate = document.querySelector(".popup__form_create");
const formAvatarUpdate = document.querySelector(".popup__form_update");

export { validationSettings };
export { formElementCreate, formAvatarUpdate, formEditProfile };
