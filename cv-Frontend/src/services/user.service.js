import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  

  getCVlist() {
    return axios.get(API_URL + 'resume', { headers: authHeader() });
  }

  getCVById(id) {
    return axios.get(API_URL + 'detail' + '/' + id, { headers: authHeader() });
  }

  create(resume) {
    return axios.post(API_URL + 'create', resume, { headers: authHeader() });
  }

  getCVByUserId(user_id) {
    return axios.get(API_URL + 'detailByUserId' + '/' + user_id, { headers: authHeader() });
  }

  update(usercv, id) {
    return axios.put(API_URL + 'update/' + id, usercv, { headers: authHeader() });
  }

  deleteResume(id) {
    return axios.delete(API_URL + 'delete/' + id);
  }


}

export default new UserService();
