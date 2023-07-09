'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      like_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_Id: {
        allowNull: false ,
        type: Sequelize.INTEGER,
        references: {
          model: 'users', 
          key: 'UserId', 
        },
        onDelete: 'CASCADE',
      },
      post_Id :{
        allowNull: false ,
        type: Sequelize.INTEGER,
        references: {
        model: 'users',
        key: 'UserId',   
      },
      onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};