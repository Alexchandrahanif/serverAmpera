"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryMenu.hasMany(models.Menu, {
        foreignKey: "CategoryMenuId",
      });
    }
  }
  CategoryMenu.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Name Tidak Boleh Null",
          },
        },
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "CategoryMenu",
    }
  );
  return CategoryMenu;
};
