module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define('Partner', {
    name: DataTypes.STRING,
    company: DataTypes.STRING,
    adress: DataTypes.STRING,
    branch: DataTypes.STRING,
    phone: DataTypes.STRING,
    fax: DataTypes.STRING,
    contracts: DataTypes.STRING
  })
  return Partner
}
