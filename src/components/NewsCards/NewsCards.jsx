import "./NewsCards.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCards({
  loggedIn,
  authButtonClick,
  handleSaveClick,
  handleDeleteClick,
  cardsToShow,
}) {
  const listItems = cardsToShow().map((card, id) => {
    if (card) {
      return (
        <NewsCard
          key={id}
          card={card}
          loggedIn={loggedIn}
          authClick={authButtonClick}
          saveClick={handleSaveClick}
          deleteClick={handleDeleteClick}
        ></NewsCard>
      );
    }
    return [];
  });

  return <ul className="news-cards">{listItems}</ul>;
}

export default NewsCards;
