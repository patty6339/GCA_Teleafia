const Patient = require('../../../../../models/user_models/patient_model');

exports.updatePatientProfile = async (req, res, user) => {
  try {
    // Get the updated profile data from the request body
    const { name, email, phoneNumber, idNumber,password, avatarsrc, backgroundImage } = req.body;

    // Find the patient record in the database using the user's email
    let patient = await Patient.findOne({ email: user.email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Update the patient's profile with the new data
    patient.name = name;
    patient.email = email;
    patient.phoneNumber = phoneNumber;
    patient.idNumber = idNumber;
    patient.password = password;
    patient.avatarsrc = avatarsrc;
    patient.backgroundImage = backgroundImage;

    // Save the updated patient record to the database
    await patient.save();

    // Return success message
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating patient profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
