"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Staff.belongsTo(models.Company, {
        foreignKey: "CompanyId",
      });
    }
  }
  Staff.init(
    {
      staffName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      pin: DataTypes.INTEGER,
      lastLogin: DataTypes.DATE,
      lastLogout: DataTypes.DATE,
      CompanyId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Staff",
    }
  );
  return Staff;
};
