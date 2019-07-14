import Api from './Api'

export default {
  /**
   * Search function that accepts strings as parameter
   * @param {string} search 
   */
  index(search) {
    return Api().get('contracts', {
      params: {
        search: search
      }
    });
  },
  post(contract) {
    return Api().post('contracts', contract);
  },
  show(contractId) {
    return Api().get(`contracts/${contractId}`);
  },
  put(contract) {
    return Api().put(`contracts/${contract.id}`, contract);
  },
  get(category) {
    return Api().get(`contracts/category/${category}`);
  },
  delete(contractId) {
    return Api().delete(`contracts/${contractId}`)
  },
  getAll() {
    return Api().get('contracts/all')
  }
};
