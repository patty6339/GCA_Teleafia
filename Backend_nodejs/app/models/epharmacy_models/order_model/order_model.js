const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/e_pharmacy');

const Order = sequelize.define('Orders', {
    orderId: {
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
    orderStatus: {
        type: DataTypes.ENUM('Ongoing', 'Delivered', 'Cancelled', 'Returned'),
        defaultValue: 'Ongoing',
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
    },
}, {
    timestamps: true,
});

module.exports = Order;
