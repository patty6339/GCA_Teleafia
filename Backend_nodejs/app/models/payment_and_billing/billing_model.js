const { DataTypes } = require('sequelize');
const sequelize = require('../../db/payment_and_billing');

const Billing = sequelize.define('Billing', {
    billingId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerEmail : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerPhoneNumber : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    appointment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amountBilled: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payBill : {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
        defaultValue: 174268
    },
    accNo :{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2223333
    },
    paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Paid'),
        defaultValue: 'Pending',
    },
    services: {
        type: DataTypes.TEXT,  
        allowNull: true, 
        get() {
            const rawValue = this.getDataValue('services');
            return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value) {
            this.setDataValue('services', JSON.stringify(value));
        },
    },
    products: {
        type: DataTypes.TEXT,  
        allowNull: true, 
        get() {
            const rawValue = this.getDataValue('products');
            return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value) {
            this.setDataValue('products', JSON.stringify(value));
        },
    }
}, {
    timestamps: true,
});

module.exports = Billing;
