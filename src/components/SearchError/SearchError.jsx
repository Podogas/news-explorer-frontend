import "./SearchError.css";
import noResultImage from "../../images/no-result.png";

function SearchError({content}) {
  return (
    <div className="search-error">
      <img
        src={noResultImage}
        alt="Ничего не найдено"
        className="search-error__image"
      ></img>
      <h2 className="search-error__title">{content.heading}</h2>
      <p className="search-error__caption">
        {content.description}
      </p>
    </div>
  );
}

export default SearchError;
