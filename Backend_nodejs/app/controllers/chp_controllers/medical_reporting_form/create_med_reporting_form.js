const MedicalReportingForm = require('../../../models/chp_models/medical_reporting_form');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

// Create a new medical reporting form
exports.createMedicalReportingForm = async (req, res) => {

  helper.log(req);
  
  try {
    const medicalReportingForm = await MedicalReportingForm.create(req.body);
    res.status(201).json(medicalReportingForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};