module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    number: DataTypes.STRING,
    partner: DataTypes.STRING,
    start: DataTypes.DATEONLY,
    duration: DataTypes.DATEONLY,
    objectives: DataTypes.TEXT,
    futureobjectives: DataTypes.TEXT,
    other: DataTypes.TEXT,
    optionalPartner: DataTypes.TEXT,
    categories: DataTypes.TEXT,
    createdBy: DataTypes.STRING,
    pricePerMonth: DataTypes.INTEGER,
    responsible: DataTypes.STRING,
    cancel: DataTypes.INTEGER,
    modifiedBy: DataTypes.STRING
  })
  return Contract
}
