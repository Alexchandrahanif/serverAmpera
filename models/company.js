"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsTo(models.CategoryCompany, {
        foreignKey: "CategoryCompanyId",
      });

      Company.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Company.init(
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Company Name Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Company Name Tidak Boleh Null",
          },
        },
      },
      address: DataTypes.STRING,
      companyLogo: DataTypes.STRING,
      CategoryCompanyId: DataTypes.UUID,
      UserId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
