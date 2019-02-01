import Api from './Api'

export default {
  get () {
    return Api().get('partner')
  },
  show(partnerId) {
    return Api().get(`partner/${partnerId}`);
  },
  post (partner) {
    return Api().post('partner', partner)
  },
  put(partnerId, partner) {
    return Api().put(`partner/${partnerId}/edit`, partner)
  },
  delete(partnerId) {
    return Api().delete(`partner/${partnerId}`)
  }
}