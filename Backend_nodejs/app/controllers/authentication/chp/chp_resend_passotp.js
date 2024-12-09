
const Helpers = require('../../../util/helpers'); // Import the Helpers class
const Chp = require('../../../models/user_models/chp_model');

// Create an instance of the Helpers class
const helper = new Helpers();

// Function to resend OTP to a Chp
exports.resendPasswordOtpChp = async (req, res) => {

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

    // Update chp's OTP in the database
    chp.passOtp = otp;
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
