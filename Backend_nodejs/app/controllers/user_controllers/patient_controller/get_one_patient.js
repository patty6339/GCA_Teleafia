const Patient = require('../../../models/user_models/patient_model')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.getOnePatient = async (req, res) => {

  helper.log(req);

  try {

    const {id} = req.params

    const patient = await Patient.findOne({where : { idNumber : id}})

    if(!patient) {

       return res.status(404).json({ message: `Patient with id: ${id} not found` });
    }

    return res.status(200).json(patient)
    
  } catch (error) {
    
    console.log(error)
    return res.status(500).json('server error')
  }
}