import Api from "./services/api";

export default {
  index(search) {
    return Api().get("contracts", {
      params: {
        search: search
      }
    });
  },
  post(contract) {
    return Api().post("contracts", contract);
  },
  show(contractId) {
    return Api().get(`contracts/${contractId}`);
  },
  put(contract) {
    return Api().pit(`songs/${contract.id}`, contract);
  }
};
