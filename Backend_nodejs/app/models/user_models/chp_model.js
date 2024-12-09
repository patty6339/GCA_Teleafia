const { DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management'); // Exporting database connection from db.js

const Chp = sequelize.define('chps', {
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
    allowNull: false,
  },
  idNumber: {
  type: DataTypes.STRING,
  allowNull: false
  },
  location: {
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
  passOtp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expiredPassOtp : {
    type: DataTypes.STRING,
    allowNull: true
  },
  profileType : {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "CHP"
  },
  isInitialPasswordChanged: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: DataTypes.JSON,
    defaultValue: 'User' 
  },
  notifications : {
    type: DataTypes.TEXT,
    allowNull: false,
    allowNullValues: true

  },
  permissions: {
      type: DataTypes.JSON 
  },
  profileImage: {
    type: DataTypes.STRING, 
    allowNull: true 
},
backgroundImage: {
    type: DataTypes.STRING,
    allowNull: true 
}
});

module.exports = Chp;
