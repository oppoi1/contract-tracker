import Api from './Api'

export default {
  get() {
    return Api().get('categories')
  },
  post(category) {
    return Api().post('categories', category)
  }
};
