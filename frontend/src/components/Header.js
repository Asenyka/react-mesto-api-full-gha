import logo from "../images/header-logo.svg";
import { Routes, Route, Link } from 'react-router-dom'; 
function Header (props){

  return (
    
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      
        <Routes>
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__link"  >Войти</Link>}/>
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__link" >Регистрация</Link>}/>
        <Route path="/" element={<div className="header__text-block">
            <p className="header__email">{props.email}</p>
            <Link to="/sign-in" className="header__link" onClick={props.onCheckOut}>Выйти</Link>
        </div>}
        />
        
        </Routes>
   </header>
   
  );
}
export default Header;
