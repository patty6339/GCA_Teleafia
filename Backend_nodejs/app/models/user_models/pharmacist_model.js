const { DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management'); // Exporting database connection from db.js

const Pharmacist = sequelize.define('Pharmacist', {
  doctorId:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email address already in use'
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialization:{
    type: DataTypes.STRING,
    allowNull: false
  },
  licenseNo:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordExpirationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isInitialPasswordChanged: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  passOtp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expiredPassOtp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profileType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "PHARMACIST"
  },
  role: {
    type: DataTypes.JSON,
    defaultValue: 'User'
  },
  permissions: {
    type: DataTypes.JSON
  },
  notifications: {
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue:'[]', 
  },
  seenNotifications:{
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue: '[]', 
  },
  unApprovedBookings: {
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue:'[]', 
  },
  approvedBookings:{
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue: '[]', 
  }
});


module.exports = Pharmacist;
