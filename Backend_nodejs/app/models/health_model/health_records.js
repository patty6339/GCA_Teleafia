const{DataTypes}=require('sequelize')
const sequelize = require('../../db/medical_services');

const HealthRecord = sequelize.define('HealthRecord', {
    
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    systolic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    diastolic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: true
    
    },
    height: {
        type: DataTypes.STRING,
        allowNull: true   
    }

})

module.exports = HealthRecord;

