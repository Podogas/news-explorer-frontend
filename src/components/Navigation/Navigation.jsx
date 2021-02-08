import "./Navigation.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logOutIcon from "../../images/logout.svg";
import whiteLogOutIcon from "../../images/logout-white.svg";

function Navigation({
  loggedIn,
  authButtonClick,
  name,
  mobileMenu,
  toggleMobileMenu,
}) {
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
        onClick={toggleMobileMenu}
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
          onClick={toggleMobileMenu}
        >
          Сохранённые статьи
        </Link>
      ) : null}
      {/*использую именно линк, что бы сразу редиректило на '/' еще до useEffect в app.js*/}
      <Link
        to="/"
        className="header__link header__auth-button"
        onClick={authButtonClickHandler}
      >
        {loggedIn ? (
          <>
            {/*auth-button это служебный блок */}
            <p className="auth-button__name">{name}</p>
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
