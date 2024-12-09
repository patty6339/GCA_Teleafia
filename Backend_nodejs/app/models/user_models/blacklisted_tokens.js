const { DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management'); 

const RefreshTokenBlacklist = sequelize.define('RefreshTokenBlacklist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.TEXT, 
    allowNull: false, 
    defaultValue: '[]'
  },
  invalidatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {});

module.exports = RefreshTokenBlacklist;
