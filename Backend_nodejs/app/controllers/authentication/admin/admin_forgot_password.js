
const Admin = require('../../../models/user_models/user_model');
const Helpers = require('../../../util/helpers');


const helper = new Helpers();

// Forgot Password
exports.adminForgotPassword = async (req, res) => {

  helper.log(req);
  
  const { email } = req.body; 

  try {
    
    const admin =  await Admin.findOne({ where: { email: email } });

    if (!admin) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    
    // Generate OTP
    const OTP = helper.generateOTP();

    admin.passOtp = OTP

    await admin.save();


    const emailResponse = await helper.sendEmail(email, `Your reset password OTP is ${OTP} click the link to reset your password http://localhost:5500/api/resetpassword`);
    if (!emailResponse.success) {
       res.status(500).json({ error: 'Failed to send OTP email' });
    }

    res.status(200).json({ message: 'OTP successfully sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
