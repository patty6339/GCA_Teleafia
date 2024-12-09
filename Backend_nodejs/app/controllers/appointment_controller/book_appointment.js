
const AppointmentBooking = require('../../models/appointment_model/appointment_booking_model');
const Helpers = require('../../util/helpers');
const Patient = require('../../models/user_models/patient_model');

const helper = new Helpers();

exports.createAppointment = async (req, res) => {
  helper.log(req);

  const { idNumber, service, appointmentType, bookFor, residence, appointmentDate, appointmentTime, email } = req.body;

  try {
    const patient = await Patient.findOne({ where: { idNumber: idNumber } });

    if (bookFor === 'myself') {
      if (!patient) {
        return res.status(400).json({ message: 'Patient not found' });
      }

      const appointmentId = await helper.generateUniqueIdentifier('A');
      const appointment = await AppointmentBooking.findOne({ where: { appointmentId: appointmentId } });
      if (appointment) {
        return res.status(400).json({ message: 'Already booked' });
      }

      const newAppointment = new AppointmentBooking({
        appointmentId,
        idNumber: patient.idNumber,
        bookFor,
        service,
        appointmentType,
        name: patient.name,
        phoneNumber: patient.phoneNumber,
        age: patient.age,
        email: patient.email,
        gender: patient.gender,
        residence: patient.residence,
        appointmentDate,
        appointmentTime
      });

      await newAppointment.save();

      const emailResponse = await helper.sendEmail(patient.email, 'Appointment booking', 
        `Dear ${patient.name}, your appointment has been successfully booked and scheduled on ${appointmentDate} at ${appointmentTime} for service: ${service}.`)
        if(!emailResponse.success) {
          return res.status(500).json({ message: 'Failed to send email' });
        }
        return res.status(201).json({ message: 'Appontment has been booked successfully'})


    } else if (bookFor === 'others') {
      const { name, phoneNumber, age, gender } = req.body;
      if (!name || !phoneNumber || !age || !gender) {
        return res.status(400).json({ message: 'Name, phone number, age, and gender cannot be empty' });
      }

      const appointmentId = await helper.generateUniqueIdentifier('A');
      const appointment = await AppointmentBooking.findOne({ where: { appointmentId: appointmentId } });
      if (appointment) {
        return res.status(400).json({ message: 'Already booked' });
      }

      const newAppointment = new AppointmentBooking({
        appointmentId,
        idNumber,
        bookFor,
        service,
        appointmentType,           
        name,
        phoneNumber,
        email,
        age,
        gender,
        residence,
        appointmentDate,
        appointmentTime
      });
      await newAppointment.save();
      
      const emailResponse = await helper.sendEmail(email, 'Appointment booking', 
        `Dear ${name}, your appointment has been successfully booked and scheduled on ${appointmentDate} at ${appointmentTime} for service: ${service}.`)
      if(!emailResponse.success) {
        return res.status(500).json({ message: 'Failed to send email' });
      }
      return res.status(201).json({ message: 'Appontment has been booked successfully'})

    } else {
      return res.status(400).json({ message: 'Invalid choice' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
