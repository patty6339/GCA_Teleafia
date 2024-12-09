const Pharmacist = require('../../../../../models/user_models/pharmacist_model');


exports.deletePharmacistProfilePicture = async (req, res, user) => {
  try {
    // Get pharmacist record from the database using the user email
    const pharmacist  = await Pharmacist.findOne({ email: user.email });
    if (!pharmacist ) {
      return res.status(404).json({ message: 'pharmacist  not found' });
    }

    // Remove the profile picture field from the pharmacist  record
    pharmacist .avatarsrc = undefined;
    await pharmacist .save();

    // Return success response
    res.status(200).json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
