import { useState } from "react";
import { Link } from "react-router-dom";
export default function Register(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  function handleEmailInputState(e) {
    setEmail(e.target.value);
  }
  function handlePasswodInputState(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ email: email, password: password });
  }

  return (
    <div className="identification identification_login">
      <form
        className="identification__form"
        method="get"
        name="register"
      >
        <h2 className="identification__heading">Регистрация</h2>
        <input
          className="input input_type_black identification__email"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
          minLength="4"
          maxLength="40"
          onChange={handleEmailInputState}
        />

        <input
          className="input input_type_black identification__password"
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="4"
          maxLength="8"
          onChange={handlePasswodInputState}
        />

        <button
          className="button identification_button"
          type="submit"
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </button>
      </form>
      <span className="identification__form-caption">
        Уже зарегистрированы?{" "}
        <Link className="link" to="/sign-in">
          Войти
        </Link>
      </span>
    </div>
  );
}
