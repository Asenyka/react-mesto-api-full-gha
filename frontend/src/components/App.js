import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import { register } from "../utils/Authentification";
import { checkToken } from "../utils/Authentification";
import { login } from "../utils/Authentification";
import InfoTooltip from "./InfoTooltip";
import tipImageSuccess from "../images/tip-image-success.png";
import tipImageFailure from "../images/tip-image-failure.png";
import ProtectedRouteElement from "./ProtectedRoute";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [tip, setTip] = useState("");
  const [tipImage, setTipImage] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("email");
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  
  useEffect(() => {
    if (loggedIn) {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((arrCard) => arrCard !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setTip("");
    setTipImage(null);
  }
  function handleUpdateUser(newUserData) {
    api
      .sendUserInfo(newUserData)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(newAvatar) {
    api
      .sendAvatar(newAvatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(userData) {
    register(userData)
      .then((user) => {
        setUserEmail(user.data.email);
        navigate("/sign-in");
        setTip("Вы успешно \n зарегистрировались!");
        setTipImage(tipImageSuccess);
      })
      .catch(() => {
        setTip("Что-то пошло не так! \n Попробуйте еще раз.");
        setTipImage(tipImageFailure);
      });
  }

  function handleLogin(userData) {
    login(userData)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddCard(card) {
    api
      .sendCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCheckOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
  }
  return (
    <CurrentUserContext.Provider value={currentUser || ""}>
      <div>
        <Header email={userEmail} onCheckOut={handleCheckOut} />
        <Routes>
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/sign-up" replace />
              )
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>

        <PopupWithForm
          popupType="confirm-deletion"
          title="Вы уверены?"
          buttonText="Да"
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip tip={tip} tipImage={tipImage} onClose={closeAllPopups} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
