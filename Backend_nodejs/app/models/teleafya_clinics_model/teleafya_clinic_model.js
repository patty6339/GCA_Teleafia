
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/teleafya_clinics'); 

const Clinic = sequelize.define('clinics', {
    clinicId : {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    services : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
});

module.exports = Clinic;

