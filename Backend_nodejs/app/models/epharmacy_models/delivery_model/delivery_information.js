const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/e_pharmacy');

const DeliveryInformation = sequelize.define('DeliveryInformation', {
  userId:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  county :{
    type: DataTypes.STRING,
    allowNull: false,
  },
  subCounty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ward: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  streetName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  houseName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
    timestamps: true,
});

module.exports = DeliveryInformation;
