
const Helpers = require('../../../util/helpers'); 
const Chp = require('../../../models/user_models/chp_model');


const helper = new Helpers();

exports.resendExpiredPasswordOtpChp = async (req, res) => {

  helper.log(req);
  
  const { email } = req.body;

  try {
    // Find the chp by email
    const chp = await Chp.findOne({ where: { email: email } });

    if (!chp) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a new OTP
    const otp = helper.generateOTP();

    chp.expiredPassOtp = otp;

    await chp.save();

    // Send email with new OTP
    const emailResponse = await helper.sendEmail(email, `Your new OTP is ${otp}`);

    if (!emailResponse.success) {
      return res.status(500).json({ error: 'Failed to resend OTP email' });
    }

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
