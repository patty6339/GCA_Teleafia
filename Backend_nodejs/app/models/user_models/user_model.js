const { DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management'); // Exporting database connection from db.js

const User = sequelize.define('users', {
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
//     gender: {
//         type: DataTypes.STRING,                  
//         allowNull: false
//     },
//     dateOfBirth:{
//         type:DataTypes.DATEONLY,
//         allowNull:true
//   },
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
    expiredPassOtp : {
        type: DataTypes.STRING,
        allowNull: true
    },
    profileType : {
        type: DataTypes.STRING,
        allowNull: false,
      },
    role: {
        type: DataTypes.JSON,
        defaultValue: 'User'
    },
    permissions: {
        type: DataTypes.JSON 
    },
    seenNotifications:{
        type: DataTypes.TEXT, 
        allowNull: true, 
        defaultValue: '[]'
    },
    unSeenNotifications:{
        type: DataTypes.TEXT, 
        allowNull: true, 
        defaultValue: '[]'
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

module.exports = User;
