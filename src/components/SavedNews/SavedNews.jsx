import "./SavedNews.css";
import NewsCards from "../NewsCards/NewsCards.jsx";

function SavedNews({
  cardsArray,
  loggedIn,
  authButtonClick,
  handleSaveClick,
  handleDeleteClick,
}) {
function test(){
  let t = cardsArray.map((card) => {
    if (card.saved) {
      return card;
    }
    return '';
  })
  return t;
}
  return (
    <main className="saved-news">
      <NewsCards
        cardsToShow={test()}
        loggedIn={loggedIn}
        authButtonClick={authButtonClick}
        handleSaveClick={handleSaveClick}
        handleDeleteClick={handleDeleteClick}
      ></NewsCards>
    </main>
  );
}

export default SavedNews;
