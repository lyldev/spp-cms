import axios from 'axios';

const HOST = 'http://localhost:8080';

class StationService {
  getList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/station`,
    };
    return axios(options);
  }

  addStation(station) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: station,
      url: `${HOST}/add/station`,
    };
    return axios(options);
  }

  deleteStation(station) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: station,
      url: `${HOST}/delete/station`,
    };
    return axios(options);
  }

  updateStation(station) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: station,
      url: `${HOST}/update/station`,
    };
    return axios(options);
  }
}

export default new StationService();
