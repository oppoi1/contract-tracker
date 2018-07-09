import Api from './Api'

export default {
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
  }
};
