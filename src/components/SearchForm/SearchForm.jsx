import React, { useState, useEffect } from "react";
import "./SearchForm.css";

function SearchForm({ onFindClick }) {
  const [value, setValue] = useState("");
  const lastQuery = (localStorage.lastQuery = localStorage.getItem(
    "lastQuery"
  ));
  useEffect(() => {
    if (lastQuery !== null && lastQuery !== "null") {
      setValue(lastQuery.slice(1, -1));
    } else {
      setValue("");
    }
  }, [lastQuery]);

  function onInputClick(e) {
    setValue("");
  }

  function onInputChange(e) {
    setValue(e.target.value);
  }
  return (
    <form className="main__search-form" onSubmit={onFindClick}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Введите тему новости"
        onClick={onInputClick}
        onChange={onInputChange}
        value={value}
      ></input>
      <button className="search-form__btn" type="submit">
        Искать
      </button>
    </form>
  );
}

export default SearchForm;
