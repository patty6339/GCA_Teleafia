const Helpers = require('../../../../../util/helpers'); // Adjust the path as needed
const {User} = require('../../../../../models/user_models/user_model');

const helpers = new Helpers();

// Controller function for fetching admin profile image URL
exports.getAdminProfileImage = async (req, res) => {
  const { id } = req.params;
  const result = await helpers.getProfileImage(id, User);
  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }
  res.status(200).json({ avatarSrcImageUrl: result.avatarSrcImageUrl });
};


