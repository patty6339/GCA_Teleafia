
const Patient = require('../../../models/user_models/patient_model')
const Helper = require('../../../util/helpers')

const helper = new Helper();


exports.verifyPatientPassOtp = async (req,res) => {

  helper.log(req);

  const { enteredPassOtp } = req.body;
  try {

    const patient = await Patient.findOne({ where: { passOtp: enteredPassOtp } });

    // Check if user found
    if (!patient || patient.passOtp !== enteredPassOtp) {
      return res.status(400).send('Invalid OTP');
    }
      
    console.log('Otp verified successfuly')

    // Delete the Password OTP after successfull verification
    await patient.update({ passOtp: null });

    return res.json({ message: 'otp verified ' })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
    
  }

}

