const Sequelize = require("sequelize");
const { sequelize } = require("../config");

const User = sequelize.define(
  "userAddress",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    addressLine1: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    postalCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lat: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
    long: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "userAddress",
    timestamps: true,
  },
);

module.exports = User;
