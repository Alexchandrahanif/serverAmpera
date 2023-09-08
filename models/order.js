"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      Order.belongsTo(models.Table, {
        foreignKey: "TableId",
      });

      Order.belongsToMany(models.Menu, {
        through: models.OrderMenu,
        foreignKey: "OrderId",
      });

      Order.hasMany(models.OrderMenu, {
        foreignKey: "OrderId",
      });
    }
  }
  Order.init(
    {
      customerName: DataTypes.STRING,
      orderCode: DataTypes.STRING,
      orderPrice: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      orderStatus: DataTypes.STRING,
      paymentStatus: DataTypes.BOOLEAN,
      UserId: DataTypes.UUID,
      TableId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
