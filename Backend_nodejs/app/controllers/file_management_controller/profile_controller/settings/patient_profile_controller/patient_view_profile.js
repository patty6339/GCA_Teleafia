const Patient = require('../../../../../models/user_models/patient_model');

exports.viewPatientProfile = async (req, res, user) => {
  try {
    const { id } = req.params;
    // Get patient record from the database using the user email
    const patient = await Patient.findOne({ where: { idNumber : id } });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Extract relevant patient details to return
    const {  email, phoneNumber, idNumber,password, backgroundImage,avatarSrc,name } = patient;

    // Return patient details
    res.status(200).json({
      
      email,
      phoneNumber,
      idNumber,
      password,
      avatarSrc,
      backgroundImage,
      name,
    });
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
