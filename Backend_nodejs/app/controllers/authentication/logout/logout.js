
const BlacklistedToken = require('../../../models/user_models/blacklisted_tokens');
const Helper = require('../../../util/helpers')

const helper = new Helper();

exports.logout = async (req, res) => {

  helper.log(req)

  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      // Find the token in the blacklist
      let blacklistedToken = await BlacklistedToken.findOne({ where: { token : token } });

      if (blacklistedToken) {

        blacklistedToken = await blacklistedToken.update({ updatedAt: new Date() });

      } else {

        blacklistedToken = await BlacklistedToken.create({ token });
        
      }

      return res.status(200).json({ message: 'Logged out successful' });
    } else {
      return res.status(401).json({ message: 'You are not authenticated' });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
