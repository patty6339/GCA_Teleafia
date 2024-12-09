
const AppointmentBooking = require('../../models/appointment_model/appointment_booking_model');
const Doctor = require('../../models/user_models/doctor_model');
const Helpers = require('../../util/helpers');

const helper = new Helpers();

exports.approveAppointment = async (req, res) => {
    try {
        helper.log(req);

        const { doctorId } = req.params;
        const {appointmentId} = req.body;

        const approvingDoctor = await Doctor.findOne({where:{doctorId:doctorId}});
        if (!approvingDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const appointment = await AppointmentBooking.findOne({ where: { appointmentId: appointmentId}});
        if (approvingDoctor && !appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.appointmentStatus === 'approved') {
            return res.status(400).json({ message: 'Appointment is already approved' });
        }


        const meetingData = await helper.createMeeting('Online consultation', 1, appointment.time, 60, 'Nairobi/Kenya')
        if(!meetingData){
            return res.status(500).json({ message: 'Failed to create zoom meeting' });
        }

        console.log('Meeting details:', meetingData);

        const meetingDetails = `
            Join URL: ${meetingData.join_url}
            Meeting ID: ${meetingData.id}
            Password: ${meetingData.password}
        `;

        const emailResponse = await helper.sendEmail(appointment.email,'Your appointment has been approved',meetingDetails)
        if(!emailResponse){
            return res.status(500).json({ message: 'Failed to send email' });
        }
        
        appointment.meetingLink = meetingData.join_url
        appointment.meetingId = meetingData.id
        appointment.passcode = meetingData.password

        appointment.appointmentStatus = 'approved';
        appointment.doctorId = approvingDoctor.doctorId;

        await appointment.save();

        return res.status(200).json({
            message: 'Appointment booking approved successfully',
            data: appointment
        });
       
    } catch (error) {
        console.error('Error approving appointment booking:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
