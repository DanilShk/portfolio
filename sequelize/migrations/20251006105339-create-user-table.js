'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUID,
          allowNull: false,
          unique: true,
        },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password_hash: { type: Sequelize.STRING, allowNull: false },
        refresh_token: { type: Sequelize.STRING, allowNull: true },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW(),
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      }),
      queryInterface.createTable('portfolios', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUID,
          allowNull: false,
          unique: true,
        },
        name: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING, allowNull: false },
        user_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: {
              tableName: 'users',
            },
            key: 'id',
          },
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW(),
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      }),
      queryInterface.createTable('images', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUID,
          allowNull: false,
          unique: true,
        },
        name: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING, allowNull: false },
        mimetype: { type: Sequelize.STRING, allowNull: false },
        original_name: { type: Sequelize.STRING, allowNull: false },
        path: { type: Sequelize.STRING, allowNull: false, unique: true },
        user_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: {
              tableName: 'users',
            },
            key: 'id',
          },
          allowNull: false,
        },
        portfolio_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: {
              tableName: 'portfolios',
            },
            key: 'id',
          },
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW(),
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      }),
      queryInterface.createTable('comments', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUID,
          allowNull: false,
          unique: true,
        },
        text: { type: Sequelize.STRING, allowNull: false },
        user_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: {
              tableName: 'users',
            },
            key: 'id',
          },
          allowNull: false,
        },
        image_id: {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: {
              tableName: 'images',
            },
            key: 'id',
          },
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW(),
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('portfolios');
    await queryInterface.dropTable('images');
    await queryInterface.dropTable('comments');
  },
};
