const Helpers = require('../../../../../util/helpers'); // Adjust the path as needed
const { Doctor} = require('../../../../../models/user_models/patient_model');

const helpers = new Helpers();

// Controller function for fetching Doctor profile image URL
exports.getDoctorProfileImage = async (req, res) => {
  const { id } = req.params;
  const result = await helpers.getProfileImage(id, Doctor);
  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }
  res.status(200).json({ avatarSrcImageUrl: result.avatarSrcImageUrl });
};


