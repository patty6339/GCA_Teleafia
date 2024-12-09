

const Patient = require('../../../models/user_models/patient_model');
const Helper = require('../../../util/helpers')

const helper = new Helper();


exports.verifyOtpAndSavePatient = async (req, res) => {

  helper.log(req);

  const { enteredOtp } = req.body;

  try {
    // Find the patient associated with the provided OTP
    const patient = await Patient.findOne({ where: { otp: enteredOtp } });

    // Check if patient found
    if (!patient) {
      return res.status(404).json({ error: 'User with the provided OTP not found' });
    }
    
    if (patient.otp !== enteredOtp) {
      return res.status(409).json({ error: 'Invalid OTP' });
    }
    
    // Update isVerified to true
    patient.isVerified = true;

    // Delete OTP after acc verification
    await patient.update({ otp: null });
  
    await patient.save();

    console.log('Account verified successfully')
    return res.status(200).json('Account verified successfully');

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


