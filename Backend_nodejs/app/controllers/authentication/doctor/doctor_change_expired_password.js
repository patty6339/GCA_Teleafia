
const Doctor = require('../../../models/user_models/doctor_model');
const Helpers = require('../../../util/helpers');

// Create an instance of the Helpers class
const helper = new Helpers();

// Forgot Password
exports.doctorChangeExpiredPassword = async (req, res) => {

  helper.log(req);
  
  const { email } = req.body; 

  try {
    // Find the user associated with the provided email
    const doctor = await Doctor.findOne({ where: { email: email } });

    if (!doctor) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    
    // Generate OTP
    const OTP = helper.generateOTP();

    doctor.expiredPassOtp = OTP

    await doctor.save();


    const emailResponse = await helper.sendEmail(email, `Your OTP for resetting expired password is ${OTP} click the link to reset your password http://localhost:5500/api/resetpassword`);
    if (!emailResponse.success) {
       res.status(500).json({ error: 'Failed to send OTP email' });
    }

    res.status(200).json({ message: 'OTP successfully sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
