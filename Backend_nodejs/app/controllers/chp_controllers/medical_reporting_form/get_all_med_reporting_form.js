const MedicalReportingForm = require('../../../models/chp_models/medical_reporting_form');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();


// Get all medical reporting forms
exports.getAllMedicalReportingForms = async (req, res) => {

  helper.log(req);
  
    try {
      const medicalReportingForms = await MedicalReportingForm.findAll();
      res.status(200).json(medicalReportingForms);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };