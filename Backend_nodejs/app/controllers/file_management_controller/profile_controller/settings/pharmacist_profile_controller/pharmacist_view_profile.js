const Pharmacist= require('../../../../../models/user_models/pharmacist_model');

exports.viewPharmacistProfile = async (req, res, user) => {
  try {
    const { id } = req.params;
    // Get pharmcist record from the database using the user email
    const pharmcist = await Pharmacist.findOne({ where: { idNumber : id } });
    if (!pharmcist) {
      return res.status(404).json({ message: 'pharmcist not found' });
    }

    // Extract relevant pharmcist details to return
    const {  email, phoneNumber, idNumber,password, backgroundImage,avatarSrc,name } = patient;

    // Return pharmcist details
    res.status(200).json({
      
      email,
      phoneNumber,
      idNumber,
      password,
      avatarSrc,
      backgroundImage,
      name,
    });
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
