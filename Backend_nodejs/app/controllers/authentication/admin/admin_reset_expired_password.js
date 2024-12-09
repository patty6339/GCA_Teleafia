
const bcryptjs = require('bcryptjs');
const Admin = require('../../../models/user_models/user_model');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

// Reset Password
exports.adminResetExpiredPassword = async (req, res) => {

  helper.log(req);
  
  const { resetCode, password } = req.body;

  try {

    // Find the user associated with the provided OTP
    const admin = await Admin.findOne({ where: { expiredPassOtp: resetCode } });

    // Check if user found
    if (!admin) {
      return res.status(404).json({ error: 'User not found with the provided OTP' });
    }

    const newAdmin =  await Admin.findOne({ where: { expiredPassOtp: resetCode } });
    const hashedPassword = bcryptjs.hashSync(password);

    // Change the password
    newAdmin.password = hashedPassword;

    admin.expiredPassOtp = null
    
    
    await newAdmin.save();

    return res.status(200).json({ message: 'Expired Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
