const Helpers = require('../../../../../util/helpers'); // Adjust the path as needed
const {Chp} = require('../../../../../models/user_models/chp_model');

const helpers = new Helpers();

// Controller function for fetching Chp profile image URL
exports.getChpProfileImage = async (req, res) => {
  const { id } = req.params;
  const result = await helpers.getProfileImage(id, Chp);
  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }
  res.status(200).json({ avatarSrcImageUrl: result.avatarSrcImageUrl });
};


