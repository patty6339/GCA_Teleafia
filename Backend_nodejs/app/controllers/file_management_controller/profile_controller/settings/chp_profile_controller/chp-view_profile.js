const Chp = require('../../../../../models/user_models/user_model');

exports.ChpViewProfile = async (req, res, user) => {
  try {
    // Get chp record from the database using the user email
    const chp = await Chp.findOne({ email: user.email });
    if (!chp) {
      return res.status(404).json({ message: 'chp not found' });
    }

    // Extract relevant chp details to return
    const { email, phoneNumber, idNumber, password, backgroundImage, avatarsrc, name } = patient;

    // Return chp details
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
    console.error('Error fetching chp profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

