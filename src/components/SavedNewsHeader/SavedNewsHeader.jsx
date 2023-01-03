import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import "./SavedNewsHeader.css";

function SavedNewsHeader() {
  const userContext = React.useContext(CurrentUserContext);

  const savedArticlesArray = userContext.savedCardsArray
    ? userContext.savedCardsArray
    : [];
  const savedArticlesQuantity =
    savedArticlesArray.length === 0
      ? "пока что нету"
      : savedArticlesArray.length;
  const lastCharNumber = savedArticlesQuantity.toString().slice(-1);
  const savedArticlesCase = () => {
    if (
      (savedArticlesQuantity === 1 || lastCharNumber === "1") &&
      savedArticlesQuantity !== 11
    ) {
      return "сохранённая статья";
    }
    if (
      (savedArticlesQuantity >= 2 && savedArticlesQuantity < 5) ||
      (parseInt(lastCharNumber, 10) >= 2 && parseInt(lastCharNumber, 10) < 5)
    ) {
      return "сохранённых статьи";
    } else {
      return "сохранённых статей";
    }
  };
  const keywordsArray = savedArticlesArray.map((el) => {
    if (el.keyword) {
      return el.keyword;
    }
    return;
  });

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  var uniqueKeywordsArray = keywordsArray.filter(onlyUnique);

  const keywordsLeftToShow = () => {
    if (uniqueKeywordsArray.length < 2) {
      return 0;
    } else {
      return uniqueKeywordsArray.length - 2;
    }
  };

  function mostPopular(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }
  function secondPopular(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }
  const mostPopularArticle = mostPopular(keywordsArray);

  const articlesWithoutMostPopular = keywordsArray.filter((a) => {
    if (a === mostPopularArticle) {
      return;
    } else {
      return a;
    }
  });
  const secondPopularArticle = secondPopular(articlesWithoutMostPopular);

  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Сохранённые статьи</h2>
      <h2 className="saved-news-header__subtitle">
        {userContext.name}, у вас {savedArticlesQuantity}
        <br></br> {savedArticlesCase()}
      </h2>
      {savedArticlesArray.length === 0 ? null : (
        <p className="saved-news-header__keywords">
          По ключевым словам:{" "}
          <span className="saved-news-header__keyword">{`${mostPopularArticle} ${
            secondPopularArticle ? "," : ""
          }`}</span>{" "}
          <span className="saved-news-header__keyword">
            {secondPopularArticle}
          </span>
          {keywordsLeftToShow() > 0 ? " и" : ""}
          <span className="saved-news-header__keyword">{`${
            keywordsLeftToShow() > 0 ? ` ${keywordsLeftToShow()}-м другим` : ""
          }`}</span>
        </p>
      )}
    </section>
  );
}

export default SavedNewsHeader;
