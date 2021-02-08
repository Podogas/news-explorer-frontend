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
  if(cardsArray) {
     cardsArray.map((card) => {
    if (card.saved) {
      return card;
    }
    return '';
  });
     return [];
  }
  return [];
}  

  return (
    <main className="saved-news">
      <NewsCards
        cardsToShow={test}
        loggedIn={loggedIn}
        authButtonClick={authButtonClick}
        handleSaveClick={handleSaveClick}
        handleDeleteClick={handleDeleteClick}
      ></NewsCards>
    </main>
  );
}

export default SavedNews;
