
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management'); 

const RolesList = sequelize.define('roles_list', {
  name: {
    type: DataTypes.STRING,  
    allowNull: false,
    unique: true
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true                                          
  }
});


module.exports = RolesList

