import closeButton from "../images/close-button.svg";
export default function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_tooltip ${props.tip ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_tooltip">
        <button className="popup__close-button button" type="button">
          <img
            className="popup__close-button-img"
            src={closeButton}
            alt=""
            onClick={props.onClose}
          />
        </button>
        <img className="popup__picture" src={props.tipImage} alt="Иконка-индикатор регистрации" />
        <p className="popup__tooltip-text">{props.tip}</p>
      </div>
    </section>
  );
}
