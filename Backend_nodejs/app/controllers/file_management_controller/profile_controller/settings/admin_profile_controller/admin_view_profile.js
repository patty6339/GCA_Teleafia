const User = require('../../../../../models/user_models/user_model');

exports.ViewAdminProfile = async (req, res, user) => {
  try {
    // Get patient record from the database using the user email
    const admin = await User.findOne({ email: user.email });
    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }

    // Extract relevant admin details to return
    const { email, phoneNumber, idNumber, password, backgroundImage, avatarsrc, name } = admin;

    // Return admin details
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
}

