import "./Main.css";
import SearchForm from "../SearchForm/SearchForm.jsx";

function Main({ onFindClick }) {
  return (
    <main className="main">
      <h1 className="main__title">Что творится в мире?</h1>
      <h2 className="main__subtitle">
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном
        кабинете.
      </h2>
      <SearchForm onFindClick={onFindClick}></SearchForm>
    </main>
  );
}

export default Main;
