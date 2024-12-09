const AppointmentBooking = require('../../models/appointment_model/appointment_booking_model');
const Doctor = require('../../models/user_models/doctor_model');

exports.rescheduleAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { appointmentDate, appointmentTime } = req.body;

    try {
        const appointment = await AppointmentBooking.findOne({ where: { appointmentId: appointmentId, appointmentStatus: 'pending'}});
        if(!appointment){
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.appointmentDate = appointmentDate;
        appointment.appointmentTime = appointmentTime;

        await appointment.save();
        res.status(200).json({ message: 'Appointment rescheduled successfully' });
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: 'Server error' });
    }
}
