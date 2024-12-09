
const bcryptjs = require('bcryptjs');
const Admin = require('../../../models/user_models/user_model');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

// Reset Password
exports.adminResetPassword = async (req, res) => {

  helper.log(req);
  
  const { resetCode, password } = req.body;

  try {

    const admin = await Admin.findOne({ where: { passOtp: resetCode } });

    // Check if user found
    if (!admin) {
      return res.status(404).json({ error: 'User not found with the provided OTP' });
    }

    const newAdmin =  await Admin.findOne({ where: { passOtp: resetCode } });
    const hashedPassword = bcryptjs.hashSync(password);

    // Change the password
    newAdmin.password = hashedPassword;
    
    
    await newAdmin.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
