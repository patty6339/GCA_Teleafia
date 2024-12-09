
const bcryptjs = require('bcryptjs');
const Chp = require('../../../models/user_models/chp_model');
const Helpers=require('../../../util/helpers')

const helper= new Helpers();

// Reset Password
exports.chpResetExpiredPassword = async (req, res) => {

  helper.log(req);
  
  const { resetCode, password } = req.body;

  try {

    // Find the user associated with the provided OTP
    const chp = await Chp.findOne({ where: { expiredPassOtp: resetCode } });

    // Check if user found
    if (!chp) {
      return res.status(404).json({ error: 'User not found with the provided OTP' });
    }

    const newChp =  await Chp.findOne({ where: { expiredPassOtp: resetCode } });
    const hashedPassword = bcryptjs.hashSync(password);

    // Change the password
    newChp.password = hashedPassword;
    
    
    await newChp.save();

    return res.status(200).json({ message: 'Expired Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
