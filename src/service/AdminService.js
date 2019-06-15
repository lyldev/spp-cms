import axios from 'axios';

const HOST = 'http://localhost:8080';

class AdminService {
  register(name, password) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: {
        name,
        password,
      },
      url: `${HOST}/register/submit`,
    };
    return axios(options);
  }
  login(name, password) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: {
        name,
        password,
      },
      url: `${HOST}/login/submit`,
    };
    return axios(options);
  }
  getAdminList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/admin`,
    };
    return axios(options);
  }
  addAdmin(admin) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: admin,
      url: `${HOST}/add/admin`,
    };
    return axios(options);
  }

  deleteAdmin(admin) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: admin,
      url: `${HOST}/delete/admin`,
    };
    return axios(options);
  }
  updateAdmin(newAdmin) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: newAdmin,
      url: `${HOST}/update/admin`,
    };
    return axios(options);
  }
}

export default new AdminService();

