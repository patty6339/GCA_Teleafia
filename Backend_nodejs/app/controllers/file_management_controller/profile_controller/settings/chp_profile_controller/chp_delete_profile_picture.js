const Chp = require('../../../../../models/user_models/chp_model');


exports.deleteChpProfilePicture = async (req, res, user) => {
  try {
    // Get Chp record from the database using the user email
    const chp = await Chp.findOne({ email: user.email });
    if (!chp) {
      return res.status(404).json({ message: 'chp not found' });
    }

    // Remove the profile picture field from the chp record
    chp.avatarsrc = undefined;
    await chp.save();

    // Return success response
    res.status(200).json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
