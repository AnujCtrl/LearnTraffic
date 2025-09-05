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
    //     buildings (id, type, x, y, capacity, zone_type) -- home/office/commercial
    // districts (id, name, bounds, traffic_density_modifier)
    await queryInterface.createTable('districts', {
      id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      traffic_density_modifier: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.createTable('buildings', {
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
      x: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      y: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      zone_type: {
        type: Sequelize.ENUM('home', 'office', 'commercial'),
        allowNull: false,
      },
      district: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'district',
          key: 'id',
        },
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
    await queryInterface.dropTable('buildings');
    await queryInterface.dropTable('districts');
  },
};
