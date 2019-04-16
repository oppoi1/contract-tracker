import Api from './Api';

export default {
  register(credentials) {
    return Api().post('register', credentials);
  },
  login(credentials) {
    return Api().post('login', credentials);
  },
  get() {
    return Api().get('users');
  },
  post(credentials) {
    return Api().post('update', credentials)
  },
  /**
   * send user obj to BE
   * verifying jwt
   * @param {obj} token 
   */
  authenticate(token) {
    return Api().post('authenticate', token)
  }
};
