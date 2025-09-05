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
    //     roads (id, start_intersection_id, end_intersection_id, length, lanes, speed_limit, created_at)
    // intersections (id, x, y, type, created_at
    // traffic_lights (id, intersection_id, state, cycle_duration, current_phase)
    await queryInterface.createTable('intersectionTypes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable('intersections', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      x: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      y: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'intersectionTypes',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable('roads', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      start_intersection_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'intersections',
          key: 'id',
        },
      },
      end_intersection_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'intersections',
          key: 'id',
        },
      },
      length: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lanes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      speed_limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable('traffic_lights', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      intersection_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'intersections',
          key: 'id',
        },
      },
      state: {
        type: Sequelize.ENUM('red', 'yellow', 'green'),
        allowNull: 'false',
      },
      cycle_duration: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
        allowNull: false,
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
    await queryInterface.dropTable('traffic_lights');
    await queryInterface.dropTable('roads');
    await queryInterface.dropTable('intersections');
    await queryInterface.dropTable('intersectionTypes');
  },
};
