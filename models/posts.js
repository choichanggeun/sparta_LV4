'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'UserId',
      });
      this.hasMany(models.Comments, {
        sourceKey: 'postId',
        foreignKey: 'PostId',
      });
      this.hasMany(models.Likes, {
        // 2. Likes 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'postId', // 3. Posts 모델의 postId 컬럼을
        foreignKey: 'Post_Id', // 4. Likes 모델의 PostId 컬럼과 연결합니다.
      });
      
    }
  }
  Posts.init({
    postId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    UserId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    writer: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    like:{
      type: Sequelize.INTEGER,
      defaultValue:0,
    },
    content: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      default: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};
