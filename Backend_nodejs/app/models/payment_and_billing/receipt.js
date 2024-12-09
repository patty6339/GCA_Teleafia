
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/payment_and_billing');

const Receipt = sequelize.define('Receipt', {
    DatePaid: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    UserId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Unpaid'
    },
    Amount : {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    TransactionId: {
        type: DataTypes.STRING,
        allowNull: false
    } 
}, {
    timestamps: false 
});

module.exports = Receipt;
