import axios from 'axios';

const HOST = 'http://localhost:8080';

class EvaluationService {
  getLatestEvaluationList() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getlist/latestevaluation`,
    };
    return axios(options);
  }

  addEvaluation(evaluation) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: evaluation,
      url: `${HOST}/add/evaluation`,
    };
    return axios(options);
  }

  deleteEvaluation(evaluation) {
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: evaluation,
      url: `${HOST}/delete/evaluation`,
    };
    return axios(options);
  }


  getAllEvaluationCount() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getcount/allevaluation`,
    };
    return axios(options);
  }
  getTodayEvaluationCount() {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      url: `${HOST}/getcount/todayevaluation`,
    };
    return axios(options);
  }
}

export default new EvaluationService();
