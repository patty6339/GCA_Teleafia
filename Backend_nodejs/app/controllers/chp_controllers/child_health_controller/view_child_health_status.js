const ChildHealthAssessment = require('../../../models/chp_models/child_health_status')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

//Get all
exports.getAllChildHealthAssessmentRecords = async (req, res) => {

  helper.log(req);

  try {

    const childHealthAssessmentRecord = await ChildHealthAssessment.findAll();

    res.json(childHealthAssessmentRecord);

  } catch (error) {
   
    res.status(500).json({ error: 'Server error' });
    
  }
};

//Get one
exports.getChildHealthAssessmentRecord = async (req, res) => {
  
  try {

    const {householdNumber} = req.params;
    const childHealthAssessmentRecord = await ChildHealthAssessment.findOne({where: {householdNumber: householdNumber}})

    if(!childHealthAssessmentRecord){

      return res.status(404).json({message: 'Household not found'});

    }
    
    res.json(childHealthAssessmentRecord);

  } catch (error) {

    res.status(500).json({ error: 'Server error' });

  }
};
