import Api from './Api'

export default {
  save (formData, contractId, user) {    
    return Api().post(`documents/upload/${contractId}/${user}`, formData)
  }
}