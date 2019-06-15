import axios from 'axios';

const HOST = 'http://localhost:8080';

class NewsService {
  getLatestNewsList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/latestnews`,
    };
    return axios(options);
  }

  addNews(news) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: news,
      url: `${HOST}/add/news`,
    };
    return axios(options);
  }

  deleteNews(news) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: news,
      url: `${HOST}/delete/news`,
    };
    return axios(options);
  }

  updateNews(newNews) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: newNews,
      url: `${HOST}/update/news`,
    };
    return axios(options);
  }

  getAllNewsCount() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getcount/allnews`,
    };
    return axios(options);
  }
}

export default new NewsService();
