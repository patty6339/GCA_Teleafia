const Pharmacist= require('../../../../../models/user_models/pharmacist_model');

exports.updatePharmacistProfile = async (req, res, user) => {
  try {
    // Get the updated profile data from the request body
    const { name, email, phoneNumber, idNumber,password, avatarsrc, backgroundImage } = req.body;

    // Find the patient record in the database using the user's email
    let pharmacist = await Pharmacist.findOne({ email: user.email });
    if (!pharmacist) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Update the patient's profile with the new data
    pharmacist.name = name;
    pharmacist.email = email;
    pharmacist.phoneNumber = phoneNumber;
    pharmacist.idNumber = idNumber;
    pharmacist.password = password;
    pharmacist.avatarsrc = avatarsrc;
    pharmacist.backgroundImage = backgroundImage;

    // Save the updated patient record to the database
    await pharmacist.save();

    // Return success message
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating pharmacist profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
