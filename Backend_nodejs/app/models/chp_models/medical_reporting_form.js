const { DataTypes } = require('sequelize');
const sequelize = require('../../db/chp_management'); // Exporting database connection from db.js

const MedicalReportingForm = sequelize.define('medical_reporting_form', {
  
  householdNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  formDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  referringNurseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  facilityName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  relevantMedicalConditions: {
      type: DataTypes.STRING, 
      allowNull: true, 
      defaultValue: '[]'
  },
  currentMedications: {
    type: DataTypes.STRING, 
    allowNull: true, 
    defaultValue: '[]'
  },
  allergies: {
    type: DataTypes.STRING, 
    allowNull: true, 
    defaultValue: '[]'
  },
  pastSurgicalHistory: {
    type: DataTypes.STRING, 
    allowNull: true, 
    defaultValue: '[]'
  },
  pastMedicalHistory: {
    type: DataTypes.STRING, 
    allowNull: true, 
    defaultValue: '[]'
  },
  diagnosticTests: {
    type: DataTypes.STRING, 
    allowNull: true, 
    defaultValue: '[]'
  },
  facilityReferredTo: {
    type: DataTypes.STRING, 
    allowNull: false  
  },
  reasonsForReporting: {
    type: DataTypes.STRING, 
    allowNull: true, 
    defaultValue: '[]'
  },
  urgencyLevel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nurseNotes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  patientName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  patientIdNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
  patientSignature: {
      type: DataTypes.STRING,
      allowNull: false 
    },
  contactInformation: {
      type: DataTypes.STRING,
      allowNull: false
    }
});

module.exports = MedicalReportingForm;
