
const Patient = require('../../../models/user_models/patient_model')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.getAllPatients = async (req, res) => {

  helper.log(req);
  
  try {

    const patients = await Patient.findAll();

    if(patients.length === 0) {

       return res.status(404).json({ message: 'No patients found' });
    }

    return res.status(200).json(patients)
    
  } catch (error) {
    
    console.log(error)
    return res.status(500).json('server error')
  }
}