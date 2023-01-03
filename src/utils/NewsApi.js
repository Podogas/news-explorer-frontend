const WeekInMs = 7 * 24 * 60 * 60 * 1000;

const _getCurrentDateString = () => {
  return new Date().toISOString();
};
const _getWeekAgoDateString = () => {
  return new Date(Date.now() - WeekInMs).toISOString();
};
/* aleksandar.podogas@yandex.ru
bd72da6114734e03ad11be08347878f6
*/
/* a.podogas@gmail.com
0992a0189e744342bf057f7e1714b37c
*/
const NewsApiConfig = {
  baseUrl: "https://newsapi.org/v2/everything?language=ru&pageSize=100",
  headers: {
    Authorization: "Bearer 0992a0189e744342bf057f7e1714b37c",
  },
};

class NewsApiClass {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }
  _formateDate(date) {
    const year = date.slice(0, 4);
    const day = date.slice(8, 10).replace(/^0+/, "");
    const mounthIndex = date.slice(5, 7) - 1;
    const mounthNames = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${day} ${mounthNames[mounthIndex]} ${year}`;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(res.status));
    }
  }
  findNews(query) {
    return fetch(
      `${
        this._url
      }&from=${_getWeekAgoDateString()}to=${_getCurrentDateString()}&q=${query}`,
      {
        headers: this._headers,
        method: "GET",
      }
    )
      .then((res) => this._checkResponse(res))
      .then((res) => {
        res.articles.map((card) => {
          const formatDate = this._formateDate(card.publishedAt);
          card.keyword = query;
          card.title = card.title;
          card.date = formatDate;
          card.text = card.description;
          card.source = card.source.name;
          card.link = card.url;
          card.image = card.urlToImage;
          return;
        });
        return res;
      });
  }
}

const NewsApi = new NewsApiClass(NewsApiConfig);
export default NewsApi;
