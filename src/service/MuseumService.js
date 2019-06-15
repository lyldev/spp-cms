import axios from 'axios';

const HOST = 'http://localhost:8080';

class MuseumService {
  getList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/museum`,
    };
    return axios(options);
  }

  addMuseum(museum) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: museum,
      url: `${HOST}/add/museum`,
    };
    return axios(options);
  }

  deleteMuseum(museum) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: museum,
      url: `${HOST}/delete/museum`,
    };
    return axios(options);
  }

  updateMuseum(museum) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: museum,
      url: `${HOST}/update/museum`,
    };
    return axios(options);
  }
}

export default new MuseumService();
