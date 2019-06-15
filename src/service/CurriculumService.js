import axios from 'axios';

const HOST = 'http://localhost:8080';

class CurriculumService {
  getLatestCurriculumList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/latestcurriculum`,
    };
    return axios(options);
  }

  addCurriculum(curriculum) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: curriculum,
      url: `${HOST}/add/curriculum`,
    };
    return axios(options);
  }

  deleteCurriculum(curriculum) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: curriculum,
      url: `${HOST}/delete/curriculum`,
    };
    return axios(options);
  }

  updateCurriculum(newCurriculum) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: newCurriculum,
      url: `${HOST}/update/curriculum`,
    };
    return axios(options);
  }
}

export default new CurriculumService();
