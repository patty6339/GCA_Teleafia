
const Helpers = require('../../../util/helpers'); // Import the Helpers class
const Patient = require('../../../models/user_models/patient_model');

// Create an instance of the Helpers class
const helper = new Helpers();

// Function to resend OTP to a patient
exports.resendOtpPatient = async (req, res) => {

  helper.log(req);

  const { email } = req.body;

  try {
    // Find the patient by email
    const patient = await Patient.findOne({ where: { email: email } });

    if (!patient) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a new OTP
    const verifyOtp = helper.generateOTP();

    // Update patient's OTP in the database
    patient.otp = verifyOtp;
    
    await patient.save();

    // Send email with new OTP
    const emailResponse = await helper.sendEmail(email, `Your new OTP is ${verifyOtp}`);

    if (!emailResponse.success) {
      return res.status(500).json({ error: 'Failed to resend OTP email' });
    }

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
