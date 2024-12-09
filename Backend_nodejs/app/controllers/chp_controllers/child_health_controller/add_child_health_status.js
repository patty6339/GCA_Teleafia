
const ChildHealthAssessment = require('../../../models/chp_models/child_health_status')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();


exports.createChildHealthAssessmentRecord = async (req, res) => {

  helper.log(req);

  try {

    const newChildHealthAssessmentRecord = await ChildHealthAssessment.create(req.body)

    res.status(201).json(newChildHealthAssessmentRecord);

  } catch (error) {
    
    res.status(500).json({ error: 'server error' });

  }

};