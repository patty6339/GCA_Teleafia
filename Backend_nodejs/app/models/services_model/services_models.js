 const { DataTypes } = require('sequelize');
const sequelize = require('../../db/medical_services');


  const Service = sequelize.define('Service', {
   serviceId : {
      type: DataTypes.STRING,
      allowNull: true,
   },
   category : {
      type: DataTypes.ENUM('General', 'Specialist'),
      allowNull: false,
      defaultValue : 'General',
   },
    name: {
       type: DataTypes.STRING,
       allowNull: false
      },
    description: {
       type: DataTypes.TEXT,
       allowNull: true
    },
    amountCharged: {
       type: DataTypes.INTEGER,
       allowNull: false,
       defaultValue: 500
    } ,
   //  isDeleted: {
   //    type: DataTypes.BOOLEAN,
   //    defaultValue: false
   //  },   
   }, {
    timestamps: true, 
   });
   
   module.exports = Service;
    