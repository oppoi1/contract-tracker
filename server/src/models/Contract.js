module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    number: DataTypes.STRING,
    start: DataTypes.DATEONLY,
    duration: DataTypes.DATEONLY,
    objectives: DataTypes.TEXT,
    futureobjectives: DataTypes.TEXT,
    other: DataTypes.TEXT,
    createdBy: DataTypes.STRING,
    pricePerMonth: DataTypes.INTEGER,
    responsible: DataTypes.STRING,
    cancel: DataTypes.INTEGER,
    modifiedBy: DataTypes.STRING
  })
  return Contract
}
