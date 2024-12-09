const AppointmentBooking = require('../../models/appointment_model/appointment_booking_model');
const Helpers = require('../../util/helpers');
const Service = require('../../models/services_model/services_models');

const helper = new Helpers();

// exports.getSinglePatientAppointments = async (req, res) => {
//     helper.log(req);
    
//     const { idNumber } = req.params;
//     try {
//         const appointments = await AppointmentBooking.findAll({ where: { idNumber: idNumber } });
        
//         if (!appointments || appointments.length === 0) {
//             return res.status(404).json({ message: 'No appointment found' });
//         }
        
//         // Create an array of promises to fetch service details for each appointment
//         const appointmentPromises = appointments.map(async (appointment) => {
//             const service = await Service.findOne({ where: { serviceId: appointment.service } });
//             if (service) {
//                 appointment.dataValues.serviceName = service.name; // Append serviceName to the appointment
//             }
//             return appointment;
//         });

//         // Resolve all promises to get the appointments with service names
//         const appointmentsWithServiceNames = await Promise.all(appointmentPromises);

//         return res.status(200).json({ appointments: appointmentsWithServiceNames });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Server error' });
//     }
// }






exports.getSinglePatientAppointments = async (req, res) => {
    helper.log(req);

    const { idNumber } = req.params;
    try {
        const appointments = await AppointmentBooking.findAll({ where: { idNumber: idNumber } });
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found' });
        }

        return res.status(200).json({ appointments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};