export class Contracts {
  number
  constructor (params) {
    number = params.number
    start = params.start
    duration = params.duration
    objectives = params.objectives
    futureobjectives = params.objectives
    other = params.other
    createdBy = params.createdBy
    pricePerMonth = params.pricePerMonth
    responsible = params.responsible
    cancel = params.cancel
    modifiedBy = params.modifiedBy
    category = params.category
  }

  get getNumber() {
    return this.number;
  }
}