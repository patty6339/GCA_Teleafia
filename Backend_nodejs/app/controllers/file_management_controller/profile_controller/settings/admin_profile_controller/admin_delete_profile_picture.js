const User = require('../../../../../models/user_models/user_model');


exports.deleteAdminProfilePicture = async (req, res, user) => {
  try {
    // Get admin record from the database using the user email
    const admin = await Patient.findOne({ email: user.email });
    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }

    // Remove the profile picture field from the admin record
    admin.profilePicture = undefined;
    await admin.save();

    // Return success response
    res.status(200).json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
