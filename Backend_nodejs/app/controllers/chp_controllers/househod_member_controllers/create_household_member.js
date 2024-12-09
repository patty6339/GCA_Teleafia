const HouseholdMember=require('../../../models/chp_models/household_member_model')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.createHouseholdMember = async (req, res) => {

  helper.log(req);

  const householdMemberDetails= req.body
  try {
    const newMember = await HouseholdMember.create(householdMemberDetails)

    return res.status(201).json(newMember);

  } catch (error) {
    
    return res.status(500).json({ error: 'server error' });

  }

};