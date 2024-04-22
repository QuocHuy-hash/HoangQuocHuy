'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Users, {foreignKey: 'userId'});
    }
  }
  Task.init({
    taskName: {
      type: DataTypes.STRING,
    },
    status : { 
      type: DataTypes.STRING,
      defaultValue: 'created',
      validate: {
        isIn: [['created', 'pendding', 'doing' ,  'finished']],
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
    indexes: [
      {
        unique: true,
        fields: ['taskName'],
      },
      {
        fields: ['description'],
      },
    ],
  });
  return Task;
};