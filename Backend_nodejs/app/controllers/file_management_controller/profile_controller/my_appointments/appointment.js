const AppointmentBooking = require('../../../../models/appointment_model');

exports.patientAppointments = async (req, res) => {
    try {
        const userId = req.params.userId;
        const AppointmentBooking = await AppointmentBooking.findAll({
            where: { userId: userId },
            order: [['date', 'DESC']]
        });
        res.json(AppointmentBooking);
    } catch (error) {
        res.status(500).send('Error retrieving appointments: ' + error.message);
    }
};
