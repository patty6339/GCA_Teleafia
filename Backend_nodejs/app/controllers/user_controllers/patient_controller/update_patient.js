
const Patient = require('../../../models/user_models/patient_model')
const bcrypt = require('bcryptjs')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();


exports.updatePatientDetails = async (req, res) => {

  helper.log(req);

  const { id } = req.params
  const updatedPatient = req.body

  try {

    const patient = await Patient.findOne({ where: { idNumber : id } })

    if (!patient) {
      return res.status(404).json({ message: 'User not found'});
    }

    if(updatedPatient.password){

      const password = bcrypt.hashSync(updatedPatient.password)

      updatedPatient.password = password
    }

    const newPatient = await patient.update(updatedPatient)
    
    res.status(200).json({ message: 'Patient details updated successfully', newPatient  })
    
  } catch (error) {

    console.log(error)
    res.status(500).json({ error: 'Server error' })    
  }

  
}