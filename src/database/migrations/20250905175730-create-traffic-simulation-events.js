'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // traffic_metrics(
    //   id,
    //   road_id,
    //   timestamp,
    //   vehicle_count,
    //   average_speed,
    //   congestion_level,
    // );
    // simulation_events(id, event_type, data, timestamp);
    await queryInterface.createTable('traffic_metrics', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      road_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'roads',
          key: 'id',
        },
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      vehicle_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      average_speed: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      congestion_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    await queryInterface.createTable('simulation_events', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('traffic_metrics');
    await queryInterface.dropTable('simulation_events');
  },
};
