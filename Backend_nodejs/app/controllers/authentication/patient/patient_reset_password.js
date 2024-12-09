const bcryptjs = require('bcryptjs');
const Patient = require('../../../models/user_models/patient_model');
const Helper = require('../../../util/helpers')

const helper = new Helper();


// Reset Password
exports.patientResetPassword = async (req, res) => {

  helper.log(req);

  const { email, newPassword } = req.body;

  try {
    const newPatient =  await Patient.findOne({ where: { email: email } });

    if(!newPatient) {
      return res.status(404).json({ error: 'User not found' });
    }

    const hashedPassword = bcryptjs.hashSync(newPassword);

    // Change the password
    newPatient.password = hashedPassword;
    
    await newPatient.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
