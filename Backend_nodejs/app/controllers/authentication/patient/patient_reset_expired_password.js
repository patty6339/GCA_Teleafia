
const bcryptjs = require('bcryptjs');
const Patient = require('../../../models/user_models/patient_model');
const Helper = require('../../../util/helpers')

const helper = new Helper();

// Reset Password
exports.patientResetExpiredPassword = async (req, res) => {

  helper.log(req);

  const { resetCode, password } = req.body;

  try {

    // Find the user associated with the provided OTP
    const patient = await Patient.findOne({ where: { expiredPassOtp: resetCode } });

    // Check if user found
    if (!patient) {
      return res.status(404).json({ error: 'User not found with the provided OTP' });
    }

    const hashedPassword = bcryptjs.hashSync(password);

    // Change the password
    patient.password = hashedPassword;

    patient.expiredPassOtp = null
    
    
    await patient.save();

    return res.status(200).json({ message: 'Expired Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
