
const Patient = require('../../../models/user_models/patient_model');
const Helpers = require('../../../util/helpers');

// Create an instance of the Helpers class
const helper = new Helpers();

// Forgot Password
exports.patientForgotPassword = async (req, res) => {

  helper.log(req);

  try {
    
    const { email } = req.body; 
    
    // Find the user associated with the provided email
    const patient = await Patient.findOne({ where: { email: email } });

    if (!patient) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    
    // Generate OTP
    const OTP = helper.generateOTP();

    patient.passOtp = OTP

    await patient.save();


    const emailResponse = await helper.sendEmail(email,"Reset password OTP", `Your reset password OTP is ${OTP} click the link to reset your password http://localhost:5500/api/resetpassword`);
    if (!emailResponse.success) {
      res.status(500).json({ error: 'Failed to send OTP email' });
    }

    res.status(200).json({ message: 'OTP successfully sent. Kindly check your email' });
   } 
    catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  
  }

}


