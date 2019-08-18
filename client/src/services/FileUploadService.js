import Api from './Api'

export default {
  save (formData, contractId) {    
    return Api().post(`documents/upload/${contractId}`, formData)
  }
}