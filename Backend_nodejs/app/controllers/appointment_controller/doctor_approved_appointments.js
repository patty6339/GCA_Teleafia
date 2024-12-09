
const AppointmentBooking = require('../../models/appointment_model/appointment_booking_model')
const Helpers = require('../../util/helpers');

const helper = new Helpers();
exports.approvedBookings = async (req, res) => {
    helper.log(req);
    
    const { doctorId } = req.params;
    try {
        const approvedAppointments = await AppointmentBooking.findAll({
            where: {
                appointmentStatus: 'approved', doctorId : doctorId
            }
        });

        if (approvedAppointments.length === 0) {
            return res.status(404).json({ message: 'No approved appointments found' });
        }

        res.status(200).json({
            message: 'Approved appointments retrieved successfully',
            data: approvedAppointments
        });
    } catch (error) {
        console.error('Error retrieving approved appointments:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
