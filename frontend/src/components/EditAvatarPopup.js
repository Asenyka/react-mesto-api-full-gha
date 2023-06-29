import PopupWithForm from "./PopupWithForm";
import React, { createRef } from "react";
export default function EditAvatarPopup(props) {
  const avatarInput = createRef();

  function handleSubmit(e) {
    e.preventDefault();
    const newAvatar = avatarInput.current.value;
    props.onUpdateAvatar(newAvatar);
  }
 
  return (
    <PopupWithForm
      popupType="udate-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="input popup__input_box_link"
        id="avatar-link"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        required
        ref={avatarInput}
      />
      <span className="popup__error popup__error_avatar-link"></span>
    </PopupWithForm>
  );
}
