"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Table.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      Table.hasMany(models.Order, {
        foreignKey: "TableId",
      });
    }
  }

  Table.init(
    {
      tableCode: DataTypes.STRING,
      tableNumber: DataTypes.INTEGER,
      totalOrder: DataTypes.INTEGER,
      orderPrice: DataTypes.INTEGER,
      totalDiscount: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      UserId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Table",
    }
  );
  return Table;
};
