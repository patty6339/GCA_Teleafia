const HouseholdMember=require('../../../models/chp_models/household_member_model')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

// View all households members
exports.getAllHouseholdsMembers = async (req, res) => {

  helper.log(req);

    try {
      const householdMembers = await HouseholdMember.findAll();
  
      res.status(200).json({householdMembers});
  
    } catch (error) {
     
      res.status(500).json({ error: 'Server error' });
      
    }
  };