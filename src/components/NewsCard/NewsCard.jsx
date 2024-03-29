import "./NewsCard.css";
import { useLocation } from "react-router-dom";

function NewsCard({
  card,
  loggedIn,
  authClick,
  saveClick,
  deleteClick,
  updateStyles,
}) {
  const currentPath = useLocation().pathname;

  function calcLines() {
    if (card.title.length <= 25) {
      return {
        title: "news-card__line-clamp_1 text-content__title",
        text: "text-content__text news-card__line-clamp_7",
      };
    } else if (card.title.length <= 50) {
      return {
        title: "news-card__line-clamp_2 text-content__title",
        text: "text-content__text news-card__line-clamp_5",
      };
    } else if (card.title.length <= 75) {
      return {
        title: "news-card__line-clamp_3 text-content__title",
        text: "text-content__text news-card__line-clamp_3",
      };
    } else if (card.title.length <= 100) {
      return {
        title: "news-card__line-clamp_4 text-content__title",
        text: "text-content__text news-card__line-clamp_3",
      };
    } else if (card.title.length <= 125) {
      return {
        title: "news-card__line-clamp_5 text-content__title",
        text: "text-content__text news-card__line-clamp_1",
      };
    } else {
      return {
        title: "text-content__title",
        text: "text-content__text",
      };
    }
  }
  function handleSaveClick() {
    saveClick(card);
  }
  function handleDeleteClick() {
    deleteClick(card);
  }
  return (
    <li className={`news-card ${updateStyles}`}>
      <img src={card.image} alt={card.title} className="news-card__image"></img>
      {currentPath === "/" ? null : (
        <span className="news-card__keyword">{card.keyword}</span>
      )}
      <button
        className={
          currentPath === "/"
            ? loggedIn
              ? card.saved
                ? "news-card__btn_bookmark-saved"
                : "news-card__btn_bookmark"
              : "news-card__btn_bookmark"
            : "news-card__btn_delete"
        }
        onClick={
          loggedIn
            ? card.saved
              ? handleDeleteClick
              : handleSaveClick
            : authClick
        }
      ></button>
      <span className="news-card__btn-tooltip">
        {currentPath === "/"
          ? loggedIn
            ? card.saved
              ? "Убрать из сохранённых"
              : "Сохранить статью"
            : "Войдите, чтобы сохранять статьи"
          : "Убрать из сохранённых"}
      </span>

      <span className="news-card__date">{card.date}</span>
      <div className="news-card__text-content">
        <a className="news-card__link" href={card.url}>
          <h2 className={calcLines().title}>{card.title}</h2>
        </a>

        <p className={calcLines().text}>{card.text}</p>
      </div>
      <span className="news-card__caption">{card.source}</span>
    </li>
  );
}

export default NewsCard;
