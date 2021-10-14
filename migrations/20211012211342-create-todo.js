'use strict';
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Todos', {
      _Tid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      _uid:{
        type: DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Todos');
  }
};