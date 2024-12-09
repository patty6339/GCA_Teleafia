// models/notification_model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management');

class Notification extends Model {}

Notification.init({
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: 'Notification',
});

module.exports = Notification;
