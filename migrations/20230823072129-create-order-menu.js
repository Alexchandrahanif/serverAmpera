"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    await queryInterface.createTable("OrderMenus", {
      id: {
        allowNull: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      total: {
        type: Sequelize.INTEGER,
      },
      catatan: {
        type: Sequelize.STRING,
      },
      MenuId: {
        type: Sequelize.UUID,
        references: {
          model: "Menus",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      OrderId: {
        type: Sequelize.UUID,
        references: {
          model: "Orders",
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
    await queryInterface.dropTable("OrderMenus");
  },
};
