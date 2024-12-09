const{DataTypes}=require('sequelize')
const sequelize = require('../../db/medical_services');



const LabResults = sequelize.define('LabResults', {

    diagnosis: {
        type: DataTypes.STRING, // Store single file URL as STRING
        allowNull: true
    },
    xray: {
        type: DataTypes.STRING, // Store single file URL as STRING
        allowNull: true
    },
    ctscan: {
        type: DataTypes.STRING, // Store single file URL as STRING
        allowNull: true
    },
    ultrasound: {
        type: DataTypes.STRING, // Store single file URL as STRING
        allowNull: true
    }
});

module.exports = LabResults;


module.exports = LabResults;