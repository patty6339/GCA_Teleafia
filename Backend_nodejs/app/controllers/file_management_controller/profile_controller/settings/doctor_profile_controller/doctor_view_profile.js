const User = require('../../../../../models/user_models/doctor_model');

exports.viewDoctorProfile = async (req, res, user) => {
  try {
    // Get Doctor record from the database using the user email
    const doctor = await User.findOne({ email: user.email });
    if (!doctor) {
      return res.status(404).json({ message: 'DOCTOR not found' });
    }

    // Extract relevant DOCTOR details to return
    const { email, phoneNumber, idNumber, password, backgroundImage, avatarsrc, name } = doctor;

    // Return DOCTOR details
    res.status(200).json({
      email,
      phoneNumber,
      idNumber,
      password,
      avatarsrc,
      backgroundImage,
      name,
    });
  } catch (error) {
    console.error('Error fetching DOCTOR profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
