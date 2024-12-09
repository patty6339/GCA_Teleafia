
const bcryptjs = require('bcryptjs');
const Doctor = require('../../../models/user_models/doctor_model');
const Helpers=require('../../../util/helpers')

const helper= new Helpers();

// Reset Password
exports.doctorResetExpiredPassword = async (req, res) => {

  helper.log(req);

  const { resetCode, password } = req.body;

  try {

    // Find the user associated with the provided OTP
    const doctor = await Doctor.findOne({ where: { expiredPassOtp: resetCode } });

    // Check if user found
    if (!doctor) {
      return res.status(404).json({ error: 'User not found with the provided OTP' });
    }

    const newDoctor =  await Doctor.findOne({ where: { expiredPassOtp: resetCode } });
    const hashedPassword = bcryptjs.hashSync(password);

    // Change the password
    newDoctor.password = hashedPassword;

    doctor.expiredPassOtp = null
    
    
    await newDoctor.save();

    return res.status(200).json({ message: 'Expired Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
