const User = require('../../../../../models/user_models/doctor_model');

exports.UpdateDoctorProfile = async (req, res, user) => {
  try {
    // Get the updated profile data from the request body
    const { name, email, phoneNumber, idNumber,password, avatarsrc, backgroundImage } = req.body;

    // Find the DOCTOR record in the database using the user's email
    let doctor = await User.findOne({ email: user.email });
    if (!doctor) {
      return res.status(404).json({ message: 'doctor not found' });
    }

    // Update the doctor's profile with the new data
    doctor.name = name;
    doctor.email = email;
    doctor.phoneNumber = phoneNumber;
    doctor.idNumber = idNumber;
    doctor.password = password;
    doctor.avatarsrc = profileImage;
    doctor.backgroundImage = backgroundImage;

    // Save the updated doctor record to the database
    await doctor.save();

    // Return success message
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
