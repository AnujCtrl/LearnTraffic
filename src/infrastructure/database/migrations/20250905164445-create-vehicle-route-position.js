/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // vehicles(
    //   id,
    //   type,
    //   start_building_id,
    //   destination_building_id,
    //   current_road_id,
    //   speed,
    //   created_at,
    // );
    // vehicle_positions(id, vehicle_id, x, y, timestamp, road_id);
    // routes(id, vehicle_id, planned_path, current_step, created_at);
    await queryInterface.createTable('vehicles', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start_building_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'buildings',
          key: 'id',
        },
      },
      destination_building_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'buildings',
          key: 'id',
        },
      },
      current_road_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'roads',
          key: 'id',
        },
      },
      speed: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.createTable('vehicle_positions', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      vehicle_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'vehicles',
          key: 'id',
        },
      },
      total_percentage_complete: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      current_road_percentage_complete: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      road_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'roads',
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
    await queryInterface.createTable('routes', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      vehicle_id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'vehicles',
          key: 'id',
        },
      },
      planned_path: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      current_step: {
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
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('routes');
    await queryInterface.dropTable('vehicle_positions');
    await queryInterface.dropTable('vehicles');
  },
};
