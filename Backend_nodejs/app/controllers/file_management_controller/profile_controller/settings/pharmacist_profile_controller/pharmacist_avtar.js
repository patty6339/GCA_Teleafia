const Helpers = require('../../../../../util/helpers'); // Adjust the path as needed
const { Pharmacist } = require('../../../../../models/user_models/pharmacist_model');

const helpers = new Helpers();

// Controller function for fetching Pharmacist profile image URL
exports.getPharmacistProfileImage = async (req, res) => {
  const { id } = req.params;
  const result = await helpers.getProfileImage(id, Pharmacist);
  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }
  res.status(200).json({ avatarSrcImageUrl: result.avatarSrcImageUrl });
};


