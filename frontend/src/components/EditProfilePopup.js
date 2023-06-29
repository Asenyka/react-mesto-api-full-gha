import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
 
  function handleNameInputState(e) {
    setName(e.target.value);
  }
  function handleDescriptionInputState(e) {
    setDescription(e.target.value);
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      popupType="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        className="input popup__input_box_name"
        id="name"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleNameInputState}
      />
      <span className="popup__error popup__error_name"></span>
      <input
        className="input popup__input_box_job"
        id="job"
        type="text"
        name="about"
        placeholder="Вид деятельности"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleDescriptionInputState}
      />
      <span className="popup__error popup__error_job"></span>
    </PopupWithForm>
  );
}
