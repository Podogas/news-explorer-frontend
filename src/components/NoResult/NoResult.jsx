import "./NoResult.css";
import noResultImage from "../../images/no-result.png";

function NoResult() {
  return (
    <div className="no-result">
      <img
        src={noResultImage}
        alt="Ничего не найдено"
        className="no-result__image"
      ></img>
      <h2 className="no-result__title">Ничего не найдено</h2>
      <p className="no-result__caption">
        К&nbsp;сожалению по&nbsp;вашему запросу ничего не&nbsp;найдено.
      </p>
    </div>
  );
}

export default NoResult;
