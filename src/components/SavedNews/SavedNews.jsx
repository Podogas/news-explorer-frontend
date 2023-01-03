import React from "react";
import "./SavedNews.css";
import NewsCards from "../NewsCards/NewsCards.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function SavedNews({
  loggedIn,
  authButtonClick,
  handleSaveClick,
  handleDeleteClick,
  updateStyles,
}) {
  const userContext = React.useContext(CurrentUserContext);
  function getSaved() {
    let savedCards = userContext.savedCardsArray.map((card) => {
      card.saved = true;
      return card;
    });
    return savedCards;
  }
  return (
    <main className="saved-news">
      <NewsCards
        updateStyles={updateStyles}
        cardsToShow={getSaved()}
        loggedIn={loggedIn}
        authButtonClick={authButtonClick}
        handleSaveClick={handleSaveClick}
        handleDeleteClick={handleDeleteClick}
      ></NewsCards>
    </main>
  );
}

export default SavedNews;
