import React, {useContext } from "react";
import addButton from "../images/add-button.svg";
import changeAvatarIcon from "../images/change-avatar.svg";
import editButton from "../images/edit-button.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__img-container">
          <img
            className="profile__pic"
            src={currentUser.avatar}
            alt="Фото профиля"
          />
          <div className="profile__overlay" onClick={onEditAvatar}>
            <img
              className="profile__update-icon"
              src={changeAvatarIcon}
              alt="Иконка редактирования профиля"
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button button"
            type="button"
            onClick={onEditProfile}
          >
            <img
              className="profile__edit-button-img"
              src={editButton}
              alt="Иконка кнопки"
            />
          </button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={onAddPlace}
        >
          <img
            className="profile__add-button-img"
            src={addButton}
            alt="Иконка кнопки"
          />
        </button>
      </section>
      <section className="places" aria-label="Галлерея живописных мест">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
