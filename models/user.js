"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helper/helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: "UserId",
      });
      User.hasMany(models.Table, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Display Name Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Display Name Tidak Boleh Null",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email Sudah Terdaftar",
        },
        validate: {
          notEmpty: {
            msg: "Email Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Email Tidak Boleh Null",
          },
          isEmail: {
            msg: "Mohon Masukkan Dengan Format Email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Password Tidak Boleh Null",
          },
        },
      },
      photoUser: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        unique: {
          msg: "Phone Number Sudah Terdaftar",
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number Tidak Boleh Kosong",
          },
          notNull: {
            msg: "Phone Number Tidak Boleh Null",
          },
        },
      },
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((data) => {
    data.password = hashingPassword(data.password);
  });
  return User;
};
