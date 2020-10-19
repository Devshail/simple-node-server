'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vehicle.init({
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    vehicle_no: DataTypes.STRING,
    registrationDate:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Vehicle',
    underscored: true
  })
  .sync({force:true});
  return Vehicle;
};