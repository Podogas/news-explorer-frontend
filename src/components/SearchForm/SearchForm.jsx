import "./SearchForm.css";

function SearchForm({ onFindClick }) {
  return (
    <form className="main__search-form">
      <input
        type="text"
        className="search-form__input"
        placeholder="Введите тему новости"
      ></input>
      <button className="search-form__btn" onClick={onFindClick}>
        Искать
      </button>
    </form>
  );
}

export default SearchForm;
