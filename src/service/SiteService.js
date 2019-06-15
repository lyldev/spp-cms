import axios from 'axios';

const HOST = 'http://localhost:8080';

class SiteService {
  getSiteCount() {
    const options = {
      method: 'GET',
      header: { 'content-type': 'application/json' },
      url: `${HOST}/getsitecount`,
    };
    return axios(options);
  }
}

export default new SiteService();
