const Helpers = require('../../../../../util/helpers'); // Adjust the path as needed
const { Patient } = require('../../../../../models/user_models/patient_model');

const helpers = new Helpers();

// Controller function for fetching Patient profile image URL
exports.getProfileImage = async (req, res) => {
  const { id } = req.params;
  const result = await helpers.getProfileImage(id, Patient);
  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }
  res.status(200).json({ avatarSrcImageUrl: result.avatarSrcImageUrl });
};


