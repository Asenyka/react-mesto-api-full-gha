import bin from "../images/bin.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const placesHeartButtonClassName = `button places__heart ${
    isLiked && "places__heart_active"
  }`;
  function handleCardClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="places__item">
      <img
        className="places__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="places__title-heart">
        <h2 className="places__title">{card.name}</h2>
        <div className="places__like">
          <button
            className={placesHeartButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="places__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button className="places__bin button" onClick={handleDeleteClick}>
          <img src={bin} alt="Иконка корзинки"/>
        </button>
      )}
    </li>
  );
}

export default Card;
