module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define('Partner', {
    name: DataTypes.STRING,
    branch: DataTypes.STRING,
    phone: DataTypes.STRING
  })
  return Partner
}
