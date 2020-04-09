'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Order', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('CREATED', 'CONFIRMED', 'REJECTED'),
        allowNull: false,
      },
      slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Slot',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Order');
  },
};
