import "./About.css";
import autorAvatar from "../../images/autor-avatar.jpg";

function About() {
  return (
    <section className="about">
      <img src={autorAvatar} alt="Саня" className="about__image"></img>
      <div className="about__description">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__paragraph">
          Привет, меня зовут Саша и я целую неделю выходных просмотрел аниме и
          провалялся в кровати, поэтому теперь мне приходится очень быстро
          верстать эту штуку.
        </p>
        <p className="about__paragraph">
          Поэтому для экономии времени можно я не буду сочинять о себе какую то
          историю и расписывать подробно чему я научился? Думаю что займусь этим
          на этапе финальной доработки, уже добавил задачку в трелло.
        </p>
      </div>
    </section>
  );
}

export default About;
