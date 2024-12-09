// cart.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/e_pharmacy');

const Cart = sequelize.define('Cart', {
    userName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    products: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Cart;
