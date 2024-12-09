
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/appointment_management'); 

const AppointmentBooking=sequelize.define('appointment_booking',{
    appointmentId:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    doctorId: {
        type: DataTypes.STRING,
        // references: {
        //     model: 'doctor',
        //     key: 'doctorId'
        // },
        allowNull: true
    },
    bookFor:{
        type:DataTypes.STRING,
        allowNull:false
    },
    service:{
        type:DataTypes.STRING,
        allowNull:false
    },
    appointmentType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    idNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    appointmentStatus:{
        type:DataTypes.STRING,
        defaultValue:'pending'
    },
    paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: 'Not paid'
    },
    residence: {
        type: DataTypes.STRING,
        allowNull:false
    },
    appointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull:true
    },
    appointmentTime: {
        type: DataTypes.TIME,
        allowNull:true
    },
    meetingVia: {
        type: DataTypes.ENUM('Zoom', 'Phone', 'Video Conference'),
        defaultValue: 'Zoom'
    },
    meetingId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    meetingLink:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    passcode: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


module.exports = AppointmentBooking;
