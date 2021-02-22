import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import Footer from "../Footer/Footer.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NoResult from "../NoResult/NoResult.jsx";
import SearchError from "../SearchError/SearchError.jsx";
import { validateSearchForm } from "../../utils/Validation.js";
import NewsApi from "../../utils/NewsApi.js";
import MainApi from "../../utils/MainApi.js";

function App() {
  const [readyToRender, setReadyToRender] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    savedCardsArray: [],
  });
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [cardsArray, setCardsArray] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [updateStyles, setUpdateStyles] = useState("");
  const [searchError, setSearchError] = useState({
    state: false,
    content: {
      heading: "Во время запроса произошла ошибка",
      description:
        "Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
    },
  });

  React.useEffect(() => {
    const userSettings = {};
    const lastQueryResults = localStorage.getItem("lastQueryResults");
    const lastQueryResultsArray = JSON.parse(lastQueryResults);
    if (lastQueryResults && loggedIn) {
      compareWithSaved(lastQueryResultsArray);
      setSearchError({ state: false });
    } else if (lastQueryResultsArray) {
      setCardsArray(lastQueryResultsArray);
    } else {
      setCardsArray(null);
    }
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.getUserData(jwt)
        .then((res) => {
          userSettings.name = res.name;
        })
        .catch((err) => console.log(err));
      MainApi.getSavedArticles(jwt)
        .then((res) => {
          userSettings.savedCardsArray = res;
        })
        .then(() => {
          setCurrentUser(userSettings);
          setLoggedIn(true);
          setReadyToRender(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setReadyToRender(true);
    }
  }, [loggedIn, updateStyles]);

  function handleDeleteClick(card) {
    const jwt = localStorage.getItem("jwt");
    MainApi.deleteArticle(jwt, card._id)
      .then((res) => {
        const newarray = currentUser.savedCardsArray.filter((item) => {
          return item._id !== card._id;
        });

        setCurrentUser({ name: currentUser.name, savedCardsArray: newarray });
        compareWithDeleted(card._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function compareWithDeleted(idOfDeleted) {
    currentUser.savedCardsArray.map((card) => {
      cardsArray.map((article) => {
        if (card.link === article.url) {
          if (idOfDeleted === article._id) {
            article.saved = false;
          }
          return;
        }
      });
    });
    setCardsArray(cardsArray);
    setReadyToRender(false);
    setReadyToRender(true);
  }

  function handleSaveClick(card) {
    const jwt = localStorage.getItem("jwt");
    card.saved = true;
    MainApi.postArticle(jwt, card)
      .then((res) => {
        res.saved = true;
        currentUser.savedCardsArray.push(res);
        setUpdateStyles("1");
        setUpdateStyles("2");
        compareWithSaved(cardsArray);
      })
      .catch((err) => console.error(err));
  }
  function onLoginClick() {
    setIsPopupOpened(true);
  }
  function compareWithSaved(articles) {
    currentUser.savedCardsArray.map((card) => {
      articles.map((article) => {
        if (card.link === article.url) {
          article._id = card._id;
          article.saved = true;
        }
      });
    });
    setCardsArray(articles);
  }
  function onGettingResults(data) {
    localStorage.setItem("lastQueryResults", JSON.stringify(data.articles));
    localStorage.setItem("lastQuery", JSON.stringify(data.query));
    if (loggedIn) {
      compareWithSaved(data.articles);
      setSearchError({ state: false });
    } else {
      setCardsArray(data.articles);
    }
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
            res.query = query;
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
  }

  function handleLogin(email, password, onError) {
    MainApi.signIn(email, password)
      .then((res) => {
        setCardsArray(null);
        localStorage.removeItem("lastQuery");
        localStorage.removeItem("lastQueryResults");

        setLoggedIn(true);
        handleClosePopup();
      })
      .catch((err) => {
        onError(err);
      });
  }
  function handleLogOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("lastQuery");
    localStorage.removeItem("lastQueryResults");
    setIsPopupOpened(false);
    setCurrentUser({});
    setLoggedIn(false);
  }
  function handleRegister(email, password, name, onSucsess, onError) {
    MainApi.signUp(email, password, name)
      .then((res) => {
        onSucsess();
      })
      .catch((err) => {
        onError(err);
      });
  }
  function handleClosePopup() {
    setIsPopupOpened(false);
  }
  function handleAuthClick() {
    return loggedIn ? handleLogOut() : onLoginClick();
  }

  function renderSavedNews() {
    return (
      <>
        <SavedNewsHeader></SavedNewsHeader>
        <SavedNews
          updateStyles={updateStyles}
          loggedIn={loggedIn}
          authButtonClick={handleAuthClick}
          handleSaveClick={handleSaveClick}
          handleDeleteClick={handleDeleteClick}
        ></SavedNews>
      </>
    );
  }
  function renderApp() {
    return (
      <div className="app">
        <Header
          loggedIn={loggedIn}
          authButtonClick={handleAuthClick}
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
                  updateStyles={updateStyles}
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
          <ProtectedRoute
            exact
            path="/saved-news"
            component={renderSavedNews}
            loggedIn={loggedIn}
            setIsPopupOpened={setIsPopupOpened}
          ></ProtectedRoute>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      {readyToRender ? renderApp() : null}{" "}
    </CurrentUserContext.Provider>
  );
}

export default App;
