'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KeyToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KeyToken.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id', 
      },
    },
    publicKey: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    privateKey: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    refreshTokensUsed: {
      type: DataTypes.JSON, 
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'KeyToken',
  });
  return KeyToken;
};