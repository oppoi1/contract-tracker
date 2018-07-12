import Api from './Api'

export default {
  get () {
    return Api().get('partner')
  },
  post (partner) {
    return Api().post('partner', partner)
  }
}