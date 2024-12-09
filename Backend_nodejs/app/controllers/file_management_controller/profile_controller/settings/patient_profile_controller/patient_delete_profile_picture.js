const Patient = require('../../../../../models/user_models/patient_model');


exports.deletePatientProfilePicture = async (req, res, user) => {
  try {
    // Get patient record from the database using the user email
    const patient = await Patient.findOne({ email: user.email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Remove the profile picture field from the patient record
    patient.avatarsrc = undefined;
    await patient.save();

    // Return success response
    res.status(200).json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
