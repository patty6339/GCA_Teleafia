const PregnancyAssessment = require('../../../models/chp_models/pregnancy_assessment')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.createPregnancyAssessmentRecord = async (req, res) => {

  helper.log(req);
  
  try {
    const newPregnancyAssessmentRecord = await PregnancyAssessment.create(req.body)

    res.status(201).json(newPregnancyAssessmentRecord);

  } catch (error) {
    
    res.status(500).json({ error: 'server error' });

  }

};