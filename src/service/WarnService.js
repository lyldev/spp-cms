import axios from 'axios';

const HOST = 'http://localhost:8080';

class WarnService {
  getWarnedTeacherList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/warnedteacher`,
    };
    return axios(options);
  }

  getNotWarnedTeacherList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/notwarnedteacher`,
    };
    return axios(options);
  }

  getWarnList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/warn`,
    };
    return axios(options);
  }
}

export default new WarnService();
