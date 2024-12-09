
const { message } = require('statuses');
const Clinic = require('../../models/teleafya_clinics_model/teleafya_clinic_model');

exports.updateClinic = async(req, res) => {
  try {

    const {id} = req.params

    const clinic = await Clinic.findOne({where : {clinicId: id}});
    
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    const updatedClinic = req.body;
    
    await clinic.update(updatedClinic);

    res.status(200).json({message:"Clinic updated successfully" , clinic});
  } catch (error) {
    
    console.error('Error updating clinic:', error);
    return res.status(500).json({message:"Internal server error"})

  }
}