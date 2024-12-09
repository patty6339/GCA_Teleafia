
const{DataTypes}=require('sequelize')
const sequelize = require('../../db/file_management');

const Prescription = sequelize.define('Prescription', {
  prescriptionId: {
    type: DataTypes.STRING,
    primaryKey: true
},
patientName: {
    type: DataTypes.STRING,
    allowNull: false
},
patientId: {
  type: DataTypes.STRING,
  allowNull: false
},
patientEmail: {
    type: DataTypes.STRING,
    allowNull: false
},
images: {
    type: DataTypes.JSON, 
    allowNull: false
},
  prescriptionStatus: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Pending',
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

})

module.exports = Prescription;  