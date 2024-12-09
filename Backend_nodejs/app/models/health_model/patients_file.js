const{DataTypes}=require('sequelize')
const sequelize = require('../../db/medical_services');
const LabResults = require('./lab_results');



const PatientFile = sequelize.define('PatientFile', {

    name: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    patientNo: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    Diagnosis: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Gender: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    Age:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Contacts:{
        type: DataTypes.STRING,
        allowNull: true
    },
    serviceProvider:{
        type: DataTypes.STRING, 
        allowNull: true
    },
    date:{
        type: DataTypes.DATE, 
        allowNull: true
    },
    time:{
        type: DataTypes.TIME,
        allowNull:false

    },
    revisitNo:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    doctorsNotes:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    LabResults:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    treatment:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    remarks:{
        type:DataTypes.TEXT,
        allowNull:true
    }
});

module.exports = PatientFile;
