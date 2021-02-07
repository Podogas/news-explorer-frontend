import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <i className="preloader__circle"></i>
      <p className="preloader__caption">Идет поиск новостей...</p>
    </div>
  );
}

export default Preloader;
