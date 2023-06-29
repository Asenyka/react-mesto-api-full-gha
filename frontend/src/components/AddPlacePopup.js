import PopupWithForm from "./PopupWithForm";
import React from "react";
export default function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  function handleNameInputState(e) {
    setName(e.target.value);
  }
  function handleLinkInputState(e) {
    setLink(e.target.value);
  }
 
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: name,
      link: link,
    });
    setName('');
    setLink('');
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      popupType="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        className="input popup__input_box_title"
        id="title"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameInputState}
      />
      <span className="popup__error popup__error_title"></span>
      <input
        className="input popup__input_box_link"
        id="link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkInputState}
      />
      <span className="popup__error popup__error_link"></span>
    </PopupWithForm>
  );
}
