import "./Header.css";
import Navigation from "../Navigation/Navigation.jsx";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Header({ loggedIn, authButtonClick, name, isPopupOpened }) {
  const currentPath = useLocation().pathname;
  const [mobileMenu, setMobileMenu] = useState(false);
  function toggleMobileMenu() {
    setMobileMenu(!mobileMenu);
  }
  return (
    <>
      <header
        className={
          currentPath === "/"
            ? mobileMenu
              ? isPopupOpened
                ? "header header_invisible"
                : "header_menu-opened header"
              : "header"
            : mobileMenu
            ? "header  header_menu-opened"
            : "header header_black"
        }
      >
        <h2 className="header__title"> NewsExplorer </h2>

        <button
          className={
            currentPath === "/"
              ? mobileMenu
                ? "header__mobile-menu-btn header__mobile-menu-btn_white header__mobile-menu-btn-cross"
                : "header__mobile-menu-btn header__mobile-menu-btn_white"
              : mobileMenu
              ? "header__mobile-menu-btn header__mobile-menu-btn_black header__mobile-menu-btn-cross"
              : "header__mobile-menu-btn header__mobile-menu-btn_black"
          }
          onClick={toggleMobileMenu}
        />
        <Navigation
          loggedIn={loggedIn}
          authButtonClick={authButtonClick}
          name={name}
          mobileMenu={mobileMenu}
          toggleMobileMenu={toggleMobileMenu}
        ></Navigation>
      </header>
      {mobileMenu ? (
        isPopupOpened ? null : (
          <div className="header_menu-opened_overlay"></div>
        )
      ) : null}
    </>
  );
}

export default Header;
