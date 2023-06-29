import closeButton from "../images/close-button.svg";
function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__picture-container">
        <button className="popup__close-button button" type="button">
          <img
            className="popup__close-button-img"
            src={closeButton}
            alt="Кнопка закрытия"
            onClick={onClose}
          />
        </button>
        <img
          className="popup__picture"
          src={card ? card.link : ""}
          alt="Изображение в оригинальном размере"
        />
        <p className="popup__caption">{card ? card.name : ""}</p>
      </div>
    </section>
  );
}
export default ImagePopup;
