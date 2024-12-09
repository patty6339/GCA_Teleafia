const Patient = require('../user_models/patient_model');
const AppointmentBooking = require('../appointment_model/appointment_booking_model');

// Define associations
Patient.hasMany(AppointmentBooking);
AppointmentBooking.belongsTo(Patient);