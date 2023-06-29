import closeButton from "../images/close-button.svg";

function PopupWithForm(props) {
 
  return (
    <section
      className={`popup popup_${props.popupType} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button className="popup__close-button button" type="button">
          <img
            className="popup__close-button-img"
            src={closeButton}
            alt="Кнопка закрытия"
            onClick={props.onClose}
          />
        </button>
        <form
          className={`popup__form popup__form_${props.popupType}`}
          method="get"
          name={props.popupType}
          onSubmit={props.onSubmit}
     
        >
          <h2 className="popup__heading">{props.title}</h2>
          {props.children}
          <button
            className="popup__button popup__button_create button"
            type="submit"
            
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
