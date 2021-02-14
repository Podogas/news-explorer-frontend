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
import SearchError from "../SearchError/SearchError.jsx";
import { validateSearchForm } from "../../utils/Validation.js";
import NewsApi from "../../utils/NewsApi.js";
/*
https://newsapi.org/v2/everything?language=ru&from2021-02-07&to=2021-02-13&q=навальный суд&pageSize=100&apiKey=0992a0189e744342bf057f7e1714b37c
*/

/*
newsapikey= '0992a0189e744342bf057f7e1714b37c'
*/
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "НеЗареган" });
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [testSavedCardsArray, setTestSavedCardsArray] = useState(
    testCardsArray
  );
  const [cardsArray, setCardsArray] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [searchError, setSearchError] = useState({
    state: false,
    content: {
      heading: "Во время запроса произошла ошибка",
      description:
        "Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    },
  });

  React.useEffect(() => {
    console.log("effect");
    const lastQueryResults = localStorage.getItem("lastQueryResults");
    if (lastQueryResults) {
      console.log("got localStorageCards");
      setCardsArray(JSON.parse(lastQueryResults));
      setSearchError({ state: false });
    }
  }, []);

  /*

  function random() {
    const randomNum = Math.random();
    if (randomNum > 0.3) {
      return testCardsArray;
    }
    return [];
  }*/
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

  function onGettingResults(data) {
    console.log("RESULT!!!");
    console.log(data);
    localStorage.setItem("lastQueryResults", JSON.stringify(data.articles));
    setCardsArray(data.articles);
    setSearchError({ state: false });
    setPreloader(false);
  }
  function onError(err, content) {
    setPreloader(false);
    setCardsArray([]);
    setSearchError({
      state: true,
      content: {
        heading: content.heading,
        description: content.description,
      },
    });
    console.error(err.message);
  }

  function onFindClick(e) {
    e.preventDefault();
    validateSearchForm(e.target.querySelector(".search-form__input").value)
      .then((query) => {
        setPreloader(true);
        NewsApi.findNews(query)
          .then((res) => {
            onGettingResults(res);
          })
          .catch((err) => {
            onError(err, {
              heading: "Во время запроса произошла ошибка",
              description:
                "Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
            });
          });
      })
      .catch((err) => {
        onError(err, {
          heading: "Нужно ввести ключевое слово",
          description: "Кажется вы ничего не ввели",
        });
      });

    console.log("find");
  }

  function handleLogin(email, password) {
    setTestSavedCardsArray(testCardsArray);
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
    /*onSucsess(); вызываем когда пришел ответ 200
    https://newsapi.org/v2/everything?q=навальный&apiKey=0992a0189e744342bf057f7e1714b37c
    */
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
          ) : searchError.state ? (
            <SearchError content={searchError.content}></SearchError>
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
