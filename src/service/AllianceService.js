import axios from 'axios';

const HOST = 'http://localhost:8080';

class AllianceService {
  getList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/alliance`,
    };
    return axios(options);
  }

  addAlliance(alliance) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: alliance,
      url: `${HOST}/add/alliance`,
    };
    return axios(options);
  }

  deleteAlliance(alliance) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: alliance,
      url: `${HOST}/delete/alliance`,
    };
    return axios(options);
  }

  updateAlliance(alliance) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: alliance,
      url: `${HOST}/update/alliance`,
    };
    return axios(options);
  }

  getCount() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getcount/alliance`,
    };
    return axios(options);
  }
}

export default new AllianceService();
