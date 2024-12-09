const Chp = require('../../../../../models/user_models/chp_model');

exports.updateChpProfile = async (req, res, user) => {
  try {
    // Get the updated profile data from the request body
    const { name, email, phoneNumber, idNumber,password, avatarsrc, backgroundImage } = req.body;

    // Find the Chp record in the database using the user's email
    let chp = await Chp.findOne({ email: user.email });
    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }

    // Update the Chp's profile with the new data
    Chp.name = name;
    Chp.email = email;
    Chp.phoneNumber = phoneNumber;
    Chp.idNumber = idNumber;
    Chp.password = password;
    Chp.profileImage =avatarsrc;
    Chp.backgroundImage = backgroundImage;

    // Save the updated Chp record to the database
    await Chp.save();

    // Return success message
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating Chp profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
