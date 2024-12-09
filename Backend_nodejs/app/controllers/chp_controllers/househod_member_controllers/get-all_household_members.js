const HouseholdMember=require('../../../models/chp_models/household_member_model')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();


exports.getHouseholdMembers = async (req, res) => {

  helper.log(req);
  
  const {householdNumber} = req.params;

    try {
      const householdMembers=await HouseholdMember.findAll({where: {householdNumber: householdNumber}})
  
      if(!householdMembers){
  
        return res.status(404).json({message: 'Household not found'});
  
      }
      return res.status(200).json({householdMembers});
  
    } catch (error) {
  
      return res.status(500).json({ error: 'Server error' });
  
    }
  };