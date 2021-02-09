import "./PopupWithForm.css";
import React, { useRef, useState } from "react";
import AuthForm from "../Forms/AuthForm/AuthForm.jsx";
import RegForm from "../Forms/RegForm/RegForm.jsx";

function PopupWithForm({ handleClosePopup, handleLogin, handleRegister }) {
  const popups = {
    reg: {
      popup: "reg",
      title: "Регистрация",
      formComponent: RegForm,
      or: true,
      linkText: "Войти",
      onSubmit: (email, password, name) => {
        handleRegister(email, password, name, onSucsess);
      },
    },
    auth: {
      popup: "auth",
      title: "Вход",
      formComponent: AuthForm,
      or: true,
      linkText: "Зарегистрироваться",
      onSubmit: handleLogin,
    },
    sucsess: {
      popup: "sucsess",
      title: "Пользователь успешно зарегистрирован!",
      formComponent: undefined,
      or: false,
      linkText: "Войти",
      onSubmit: "",
    },
  };

  const [popupSetup, setPopupSetup] = useState(popups.auth);
  function changePopup() {
    if (popupSetup.popup === "auth") {
      setPopupSetup(popups.reg);
    }
    if (popupSetup.popup === "reg") {
      setPopupSetup(popups.auth);
    }
    if (popupSetup.popup === "sucsess") {
      setPopupSetup(popups.auth);
    }
  }

  function onSucsess() {
    setPopupSetup(popups.sucsess);
    console.log("sucsess");
  }
  const notOverlayEl = useRef(null);

  React.useEffect(() => {
    function escClose(e) {
      if (e.key === "Escape") {
        handleClosePopup();
      }
      return;
    }
    function onOverlayClose(e) {
      if (notOverlayEl.current && !notOverlayEl.current.contains(e.target)) {
        if (e.target.classList.value !== "reg-form__submit-btn") {
          handleClosePopup();
        }
        return;
      }
      return;
    }

    document.addEventListener("click", onOverlayClose);
    document.addEventListener("keydown", escClose);
    return () => {
      document.removeEventListener("click", onOverlayClose);
      document.removeEventListener("keydown", escClose);
    };
  });

  return (
    <div className="popup-with-form">
      <div className="popup-with-form__window" ref={notOverlayEl}>
        <button
          className="popup-with-form__cross-btn"
          onClick={handleClosePopup}
        ></button>
        <h2
          className={
            popupSetup.formComponent
              ? "popup-with-form__title"
              : "popup-with-form__title popup-with-form__title_sucsess"
          }
        >
          {popupSetup.title}
        </h2>
        {popupSetup.formComponent ? (
          <popupSetup.formComponent onSubmit={popupSetup.onSubmit} />
        ) : null}
        <div
          className={
            popupSetup.formComponent
              ? "popup-with-form__caption"
              : "popup-with-form__caption popup-with-form__caption_sucsess"
          }
        >
          {popupSetup.or ? (
            <span className="popup-with-form__or">или </span>
          ) : null}
          <button onClick={changePopup} className="popup-with-form__goto-btn">
            {popupSetup.linkText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
