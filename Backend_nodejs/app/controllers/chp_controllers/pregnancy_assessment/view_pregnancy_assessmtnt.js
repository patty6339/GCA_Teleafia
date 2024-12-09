const PregnancyAssessment = require('../../../models/chp_models/pregnancy_assessment')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

//Get all
exports.getAllPregnancyAssessmentRecords = async (req, res) => {

  helper.log(req);

  try {
    const PregnancyAssessmentRecord = await PregnancyAssessment.findAll();

    res.json(PregnancyAssessmentRecord);

  } catch (error) {
   
    res.status(500).json({ error: 'Server error' });
    
  }
};

//Get one
exports.getPregnancyAssessmentRecord = async (req, res) => {
  
  try {

    const {householdNumber} = req.params;
    const pregnancyAssessmentRecord = await PregnancyAssessment.findOne({where: {householdNumber: householdNumber}})

    if(!pregnancyAssessmentRecord){

      return res.status(404).json({message: 'Household not found'});

    }
    
    res.json(pregnancyAssessmentRecord);

  } catch (error) {

    res.status(500).json({ error: 'Server error' });

  }
};
