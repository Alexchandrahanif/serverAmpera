"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Menu.belongsToMany(models.Order, {
        through: models.OrderMenu,
        foreignKey: "MenuId",
      });

      Menu.hasMany(models.OrderMenu, {
        foreignKey: "MenuId",
      });

      Menu.belongsTo(models.CategoryMenu, {
        foreignKey: "CategoryMenuId",
      });

      Menu.belongsTo(models.Company, {
        foreignKey: "CompanyId",
      });
    }
  }
  Menu.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      stokMenu: DataTypes.INTEGER,
      photoMenu: DataTypes.INTEGER,
      CategoryMenuId: DataTypes.UUID,
      CompanyId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
