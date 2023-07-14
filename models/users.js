'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Posts, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasMany(models.Comments, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasMany(models.Likes, {
      // 2. Comments 모델에게 1:N 관계 설정을 합니다.
      sourceKey: 'userId', // 3. Users 모델의 userId 컬럼을
      foreignKey: 'User_Id', // 4. Comments 모델의 UserId 컬럼과 연결합니다.
    });
  
  }
 }

  Users.init({
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
      Unique:true
    },
    email: {
      type: Sequelize.STRING,
      allowNull:false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull:false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue:Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};