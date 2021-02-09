import "./NewsCardList.css";
import React, { useState } from "react";
import NewsCards from "../NewsCards/NewsCards.jsx";

function NewsCardList({
  loggedIn,
  authButtonClick,
  handleSaveClick,
  handleDeleteClick,
  cardsArray,
}) {
  const [cardsQuantityToShow, setCardsQuantityToShow] = useState(3);
  const [cardsToShow, setCardsToShow] = useState(cardsArray.slice(0, 3));

  function handleCardsQuantity() {
    setCardsQuantityToShow(cardsQuantityToShow + 3);
    setCardsToShow(cardsArray.slice(0, (cardsQuantityToShow +3)));
  }
  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Результаты поиска</h2>
      <NewsCards
        cardsToShow={cardsToShow}
        loggedIn={loggedIn}
        authButtonClick={authButtonClick}
        handleSaveClick={handleSaveClick}
        handleDeleteClick={handleDeleteClick}
      ></NewsCards>
      <button className="news-card-list__button" onClick={handleCardsQuantity}>
        Показать еще
      </button>
    </section>
  );
}

export default NewsCardList;
