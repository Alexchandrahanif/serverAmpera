"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      customerName: {
        type: Sequelize.STRING,
      },
      orderCode: {
        type: Sequelize.STRING,
      },
      orderPrice: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      orderStatus: {
        type: Sequelize.STRING,
      },
      paymentStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      TableId: {
        type: Sequelize.UUID,
        references: {
          model: "Tables",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
