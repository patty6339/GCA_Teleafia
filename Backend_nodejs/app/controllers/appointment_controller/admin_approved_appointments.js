const AppointmentBooking = require('../../models/appointment_model/appointment_booking_model');

exports.getAllApprovedAppointments = async(req, res) => {
    try {
        const approvedAppointments = await AppointmentBooking.findAll({
            where: { appointmentStatus : 'approved' }
        })
        if(approvedAppointments.length === 0){
            return res.status(404).json({ message: 'No approved appointments found.' });
        }
        res.status(200).json({approvedAppointments});
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error.' });
    }
}