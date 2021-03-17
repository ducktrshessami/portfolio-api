'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Project.belongsToMany(models.Lang, { through: "ProjectLangs" });
    }
  };
  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true }
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
