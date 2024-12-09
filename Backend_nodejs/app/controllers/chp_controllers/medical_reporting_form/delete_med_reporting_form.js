const MedicalReportingForm = require('../../../models/chp_models/medical_reporting_form');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

// Delete a medical reporting form by ID
exports.deleteMedicalReportingFormById = async (req, res) => {

  helper.log(req);
  
    try {
      const {patientIdNumber} = req.params;
      const patientForm = await MedicalReportingForm.findOne({where: {patientIdNumber: patientIdNumber}});
  
      if (!patientForm) {
        return res.status(404).json({ error: 'Medical reporting form not found' });
      }
        await patientForm.destroy();
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };