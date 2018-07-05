import Api from './Api'

export default {
  // index(search) {
  //   return Api().get('categories', {
  //     params: {
  //       search: search
  //     }
  //   });
  // },
  get() {
    return Api().get('categories')
  }
};
