import "./NewsCardList.css";
import React, { useState } from "react";
import NewsCards from "../NewsCards/NewsCards.jsx";

function NewsCardList({
  loggedIn,
  authButtonClick,
  handleSaveClick,
  handleDeleteClick,
  cardsArray,
  updateStyles,
}) {
  const CardsPerClick = 3;
  const [cardsQuantityToShow, setCardsQuantityToShow] = useState(CardsPerClick);
  const [cardsToShow, setCardsToShow] = useState(
    cardsArray.slice(0, CardsPerClick)
  );
  const [buttonClassName, setButtonClassName] = useState(isButtonBlocked);

  function handleCardsQuantity() {
    setCardsQuantityToShow(cardsQuantityToShow + CardsPerClick);
    setCardsToShow(cardsArray.slice(0, cardsQuantityToShow + CardsPerClick));
    setButtonClassName(isButtonBlocked);
  }
  function isButtonBlocked() {
    if (cardsArray.length <= cardsQuantityToShow + CardsPerClick) {
      return "news-card-list__button news-card-list__button_blocked";
    } else {
      return "news-card-list__button";
    }
  }
  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Результаты поиска</h2>
      <NewsCards
        updateStyles={updateStyles}
        cardsToShow={cardsToShow}
        loggedIn={loggedIn}
        authButtonClick={authButtonClick}
        handleSaveClick={handleSaveClick}
        handleDeleteClick={handleDeleteClick}
      ></NewsCards>
      <button className={buttonClassName} onClick={handleCardsQuantity}>
        Показать еще
      </button>
    </section>
  );
}

export default NewsCardList;
