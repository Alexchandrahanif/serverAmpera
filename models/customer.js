"use strict";
const { hashingPassword } = require("../helper/helper");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, {
        foreignKey: "CustomerId",
      });
    }
  }
  Customer.init(
    {
      customerName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      pin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  Customer.beforeCreate((data) => {
    data.pin = hashingPassword(data.pin);
  });
  return Customer;
};
