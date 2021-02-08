import "./Footer.css";
import { Link } from "react-router-dom";
import ghIcon from "../../images/github.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__about">© 2020 Supersite, Powered by News API</p>
      <nav className="footer__navbar">
        <Link to="/" className="footer__link footer__link-main">
          Главная
        </Link>
        <a
          href="https://praktikum.yandex.ru/"
          target="_blank"
          rel="noreferrer"
          className="footer__link footer__link-practicum"
        >
          Яндекс.Практикум
        </a>
        <a
          href="https://github.com/podogas"
          target="_blank"
          rel="noreferrer"
          className="footer__link footer__link-gh"
        >
          <img src={ghIcon} alt="git" className="footer__link-gh-icon"></img>
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noreferrer"
          className="footer__link footer__link-fb"
        >
          <div className="footer__link-fb-icon"></div>
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
