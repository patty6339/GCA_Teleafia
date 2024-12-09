
const { message } = require('statuses');
const AppointmentBooking = require('../../models/appointment_model/appointment_booking_model');
const Doctor = require('../../models/user_models/doctor_model');
const Helpers=require ('../../util/helpers')

const helper=new Helpers();

exports.cancelAppointment = async (req, res) => {

    helper.log(req);
    
    const { appointmentId } = req.params;
   

    try {
        const appointment = await AppointmentBooking.findOne({ where: { appointmentId: appointmentId, appointmentStatus: 'pending'}});
        if(!appointment){
            return res.status(404).json({ error: 'Appointment not found' });
        }
        
        appointment.appointmentStatus = 'cancelled';
        await appointment.save();

        return res.status(200).json({ message: 'Appointment has been cancelled'})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
