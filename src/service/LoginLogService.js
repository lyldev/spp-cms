import axios from 'axios';

const HOST = 'http://localhost:8080';

class LoginLogService {
  getAllRegisterCount() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getcount/allregister`,
    };
    return axios(options);
  }
  getTodayRegisterCount() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getcount/todayregister`,
    };
    return axios(options);
  }
  getAllLoginCount() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getcount/alllogin`,
    };
    return axios(options);
  }
  getTodayLoginCount() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getcount/todaylogin`,
    };
    return axios(options);
  }
}

export default new LoginLogService();
