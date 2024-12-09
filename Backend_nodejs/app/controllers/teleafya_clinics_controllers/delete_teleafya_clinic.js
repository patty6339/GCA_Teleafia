
const Clinic = require('../../models/teleafya_clinics_model/teleafya_clinic_model');

exports.deleteClinic = async (req,res) => {
  try {

    const {id} = req.params

    const clinic = await Clinic.findOne({where : {clinicId : id}})
    
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

     clinic.isDeleted = true;
     await clinic.save();
    
    res.status(200).json({message:'Clinic deleted successfully'});
    
  } catch (error) {

    console.log(error);
    res.status(500).send('Internal Server Error');

  }
}