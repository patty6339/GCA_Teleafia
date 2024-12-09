const MedicalReportingForm = require('../../../models/chp_models/medical_reporting_form');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

// Get a single medical reporting form by Household Number
exports.getMedicalReportingFormById = async (req, res) => {

  helper.log(req);
  
  try {
    const { patientIdNumber } = req.params; 
    const medicalReportingForm = await MedicalReportingForm.findOne({where: {patientIdNumber:patientIdNumber}});
    if (!medicalReportingForm) {
      return res.status(404).json({ error: 'Medical reporting form not found' });
    }
    res.status(200).json(medicalReportingForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}