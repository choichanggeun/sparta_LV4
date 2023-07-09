'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      
      this.belongsTo(models.Users, {
      
        targetKey: 'userId', 
        foreignKey: 'User_Id', 
      });

     
      this.belongsTo(models.Posts, {
      
        targetKey: 'postId', 
        foreignKey: 'Post_Id',
      });
    }
    
    }
  
  Likes.init({
    
      like_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      User_Id: {
        allowNull: false ,
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Users 모델을 참조합니다.
          key: 'UserId', // Users 모델의 userId를 참조합니다.
        },
        onDelete: 'CASCADE',
      },
      Post_Id :{
        allowNull: false ,
        type: Sequelize.INTEGER,
        references: {
        model: 'users', // Users 모델을 참조합니다.
        key: 'UserId', // Users 모델의 userId를 참조합니다.  
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
    },  {
          sequelize,
          modelName: 'Likes',
        });
        return Likes;
  
};