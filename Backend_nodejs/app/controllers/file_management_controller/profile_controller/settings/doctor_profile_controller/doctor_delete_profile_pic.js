const User = require('../../../../../models/user_models/doctor_model');


exports.deleteDoctorProfilePicture = async (req, res, user) => {
  try {
    // Get doctor record from the database using the user email
    const doctor = await User.findOne({ email: user.email });
    if (!doctor) {
      return res.status(404).json({ message: 'doctor not found' });
    }

    // Remove the profile picture field from the doctor record
    doctor.profilePicture = undefined;
    await doctor.save();

    // Return success response
    res.status(200).json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
