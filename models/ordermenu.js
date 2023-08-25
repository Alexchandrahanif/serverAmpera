"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderMenu.belongsTo(models.Order, {
        foreignKey: "OrderId",
      });

      OrderMenu.belongsTo(models.Menu, {
        foreignKey: "MenuId",
      });
    }
  }
  OrderMenu.init(
    {
      total: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      catatan: DataTypes.STRING,
      MenuId: DataTypes.UUID,
      OrderId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "OrderMenu",
    }
  );
  return OrderMenu;
};
