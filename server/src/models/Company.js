module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    branch: DataTypes.STRING,
    phone: DataTypes.STRING,
    fax: DataTypes.STRING,
    contracts: DataTypes.STRING
  })
  return Company
}
