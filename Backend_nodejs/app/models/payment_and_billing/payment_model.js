// payment.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/payment_and_billing');

const Payment = sequelize.define('Payment', {                                   
    amountPaid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    customerId : {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    customerEmail: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    products: {
        type: DataTypes.JSON, // Use JSON to store arrays
        allowNull: true,
        defaultValue: [] // Default to an empty array
    },
    services: {
        type: DataTypes.JSON, // Use JSON to store arrays
        allowNull: true,
        defaultValue: [] // Default to an empty array
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    }
}, {
    timestamps: true 
});

module.exports = Payment;
