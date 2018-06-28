module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    number: DataTypes.STRING,
    partner: DataTypes.STRING,
    start: DataTypes.DATE,
    duration: DataTypes.DATE,
    objectives: DataTypes.TEXT,
    futureobjectives: DataTypes.TEXT,
    other: DataTypes.TEXT,
    optionalPartner: DataTypes.TEXT,
    createdBy: DataTypes.STRING
  })

  return Contract
}
