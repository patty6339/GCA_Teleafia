const Clinic = require('../../models/teleafya_clinics_model/teleafya_clinic_model')
const Helpers = require('../../util/helpers');

const helper = new Helpers();

exports.getAllTeleafyaClinics = async (req, res) => {

  helper.log(req);
  
  try{
      const clinics = await Clinic.findAll()

      if (!clinics) {
        return res.status(404).json({message : "Not found"})
      }

      return res.json( clinics )

    } catch (e) {
      console.error(e)
    }
}