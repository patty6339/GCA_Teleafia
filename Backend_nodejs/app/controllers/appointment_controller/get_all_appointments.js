// const AppointmentBooking = require('../../models/appointment_model/appointment_booking_model');
// const Service = require('../../models/services_model/services_models');
// const Helpers = require('../../util/helpers');

// const helper = new Helpers();

// exports.getAllAppointments = async (req, res) => {
//   helper.log(req);

//   try {
//     const appointments = await AppointmentBooking.findAll();

//     // Map through each appointment to find and assign the service name
//     const updatedAppointments = await Promise.all(
//       appointments.map(async (appointment) => {
//         const serviceInDb = await Service.findOne({ where: { serviceId: appointment.service } });
        
//         // Convert Sequelize instance to plain object and remove serviceId
//         let appointmentObject = appointment.toJSON();
//         delete appointmentObject.service; // Omit the service ID
        
//         // Add the service name to the appointment object
//         appointmentObject.serviceName = serviceInDb ? serviceInDb.name : null;

//         return appointmentObject;
//       })
//     );

//     return res.status(200).json({ appointments: updatedAppointments });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'server error' });
//   }
// };







const AppointmentBooking= require ('../../models/appointment_model/appointment_booking_model')
const Helpers = require('../../util/helpers');

const helper = new Helpers();

exports.getAllAppointments = async (req,res)=>{

    helper.log(req);
    
    try{

        const appointments= await AppointmentBooking.findAll();
        if(appointments.length === 0){
            return res.status(404).json({message:'No appointments found'})
        }
        return res.status(200).json(appointments)
        
    }catch(error){
        return res.status(500).json({message:'server error'})
    }
}