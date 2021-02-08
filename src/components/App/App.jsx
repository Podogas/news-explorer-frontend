import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import testCardsArray from "../../utils/cardsArray.js";
import NoResult from "../NoResult/NoResult.jsx";

function App() {


  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: 'НеЗареган'});
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [testSavedCardsArray, setTestSavedCardsArray] =useState(null);
  const [cardsArray, setCardsArray] = useState(null);
  const [preloader, setPreloader] = useState(false);

console.log(loggedIn)
  function handleDeleteClick() {
    console.log("delete");
  }
  function handleSaveClick() {
    console.log("saved");
  }
  function onLoginClick() {
    setIsPopupOpened(true);
    console.log("loginPopUP");
  }
  function onGettingResults() {
    console.log("RESULT!!!");
    setCardsArray(testCardsArray);
    setPreloader(false);
  }

  function onFindClick(e) {
    e.preventDefault();
    setPreloader(true);
    setTimeout(onGettingResults, 2000);

    console.log("find");
  }

  function handleLogin(email, password) {
    setTestSavedCardsArray(testCardsArray)
    setLoggedIn(true);
    handleClosePopup();
    console.log("login!");
  }
  function handleLogOut() {
    setIsPopupOpened(false);
    setCurrentUser({});
    setLoggedIn(false);
    console.log("logOUT");
  }
  function handleRegister(email, password, name, onSucsess) {
    setCurrentUser({ name: name });
    /*onSucsess(); вызываем когда пришел ответ 200*/
    onSucsess();
    console.log("reg");
  }
  function handleClosePopup() {
    setIsPopupOpened(false);
    console.log("closePOpup");
  }
  function handleAuthClick() {
    return loggedIn ? handleLogOut() : onLoginClick();
  }

  return (
    <div className="app">
      <Header
        loggedIn={loggedIn}
        authButtonClick={handleAuthClick}
        name={currentUser.name}
        isPopupOpened={isPopupOpened}
      />
      <Switch>
        <Route exact path="/">
          {isPopupOpened ? (
            <PopupWithForm
              handleClosePopup={handleClosePopup}
              handleLogin={handleLogin}
              handleRegister={handleRegister}
            ></PopupWithForm>
          ) : null}

          <Main onFindClick={onFindClick}></Main>
          {cardsArray && cardsArray.length !== 0 ? (
            preloader ? (
              <Preloader></Preloader>
            ) : (
              <NewsCardList
                cardsArray={cardsArray}
                loggedIn={loggedIn}
                authButtonClick={handleAuthClick}
                handleSaveClick={handleSaveClick}
                handleDeleteClick={handleDeleteClick}
              ></NewsCardList>
            )
          ) : preloader ? (
            <Preloader></Preloader>
          ) : cardsArray && cardsArray.length === 0 ? (
            <NoResult></NoResult>
          ) : null}

          <About></About>
        </Route>
        <Route exact path="/saved-news">
          <SavedNewsHeader name={currentUser.name}></SavedNewsHeader>
          <SavedNews
            cardsArray={testSavedCardsArray}
            loggedIn={loggedIn}
            authButtonClick={handleAuthClick}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
          ></SavedNews>
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
