import './SearchForm.css';

function SearchForm() {
  return (
    <form className="main__search-form">
        <input type="text" className="search-form__input" placeholder="Введите тему новости"></input>
        <button className="search-form__btn">Искать</button>
    </form>
  );
}

export default SearchForm;