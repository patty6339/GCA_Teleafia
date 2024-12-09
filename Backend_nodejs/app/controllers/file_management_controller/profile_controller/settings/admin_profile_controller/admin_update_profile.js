const User = require('../../../../../models/user_models/user_model');

exports.UpdateAdminProfile = async (req, res, user) => {
  try {
    // Get the updated profile data from the request body
    const { name, email, phoneNumber, idNumber,password, profileImage, backgroundImage } = req.body;

    // Find the admin record in the database using the user's email
    let admin = await User.findOne({ email: user.email });
    if (!admin) {
      return res.status(404).json({ message: 'admin not found' });
    }

    // Update the admin's profile with the new data
    admin.name = name;
    admin.email = email;
    admin.phoneNumber = phoneNumber;
    admin.idNumber = idNumber;
    admin.password = password;
    admin.profileImage = profileImage;
    admin.backgroundImage = backgroundImage;

    // Save the updated admin record to the database
    await admin.save();

    // Return success message
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
