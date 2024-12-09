const Household = require('../../../models/chp_models/household_model');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

// Get a single household
exports.getOneHousehold= async (req, res) => {

    helper.log(req);

    const {householdNumber} = req.params;
    
    try {

        const household = await Household.findOne({where: {householdNumber: householdNumber}})
        if (!household) {
            res.json({ message: 'Household not found'});
        } 

        res.json(household);
 
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};