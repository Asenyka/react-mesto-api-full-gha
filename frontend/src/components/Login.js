import { useState } from "react";
export default function Login(props){
  const [email, setEmail] = useState();
  const[password, setPassword] = useState();
  function handleEmailInputState(e) {
    setEmail(e.target.value);
  }
  function handlePasswodInputState(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({password: password, email: email});
  }

    return(
        <div className="identification identification_login">
        <form
          className="identification__form"
          method="get"
          name="login"
        >
          <h2 className="identification__heading">Вход</h2>
          <input
        className="input input_type_black identification__email"
        id="loginName"
        type="email"
        name="loginEmail"
        placeholder="Email"
        required
        minLength="4"
        maxLength="40"
        onChange={handleEmailInputState}
      />
    
      <input
        className="input input_type_black identification__password"
        id="loginPassword"
        type="password"
        name="loginPassword"
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
           Войти
          </button>
        </form>
      </div> 
    )
}