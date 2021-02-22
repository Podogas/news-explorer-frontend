import "./Navigation.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logOutIcon from "../../images/logout.svg";
import whiteLogOutIcon from "../../images/logout-white.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Navigation({
  loggedIn,
  authButtonClick,
  mobileMenu,
  toggleMobileMenu,
}) {
  const userContext = React.useContext(CurrentUserContext);
  const currentPath = useLocation().pathname;
  function authButtonClickHandler() {
    authButtonClick();
    toggleMobileMenu();
  }
  return (
    <nav
      className={
        mobileMenu
          ? "header__navbar header__navbar_mobile-visible"
          : "header__navbar"
      }
    >
      <Link
        to="/"
        className={
          currentPath === "/"
            ? "header__link header__link_selected"
            : "header__link"
        }
        onClick={mobileMenu ? toggleMobileMenu : null}
      >
        Главная
      </Link>
      {loggedIn ? (
        <Link
          to="/saved-news"
          className={
            currentPath === "/saved-news"
              ? "header__link header__link_selected"
              : "header__link"
          }
          onClick={mobileMenu ? toggleMobileMenu : null}
        >
          Сохранённые статьи
        </Link>
      ) : null}

      <Link
        to="/"
        className="header__link header__auth-button"
        onClick={authButtonClickHandler}
      >
        {loggedIn ? (
          <>
            {/*auth-button это служебный блок */}
            <p className="auth-button__name">{userContext.name}</p>
            <img
              src={whiteLogOutIcon}
              alt="выход"
              className={
                currentPath === "/"
                  ? "auth-button__icon"
                  : mobileMenu
                  ? "auth-button__icon"
                  : "auth-button__icon_hidden"
              }
            />
            <img
              src={logOutIcon}
              alt="выход"
              className={
                currentPath === "/"
                  ? "auth-button__icon_hidden"
                  : mobileMenu
                  ? "auth-button__icon_hidden"
                  : "auth-button__icon"
              }
            />
          </>
        ) : (
          "Авторизоваться"
        )}
      </Link>
    </nav>
  );
}

export default Navigation;
