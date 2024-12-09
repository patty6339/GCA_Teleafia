const Household = require('../../../models/chp_models/household_model');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.updateHousehold=async (req, res) => {

    helper.log(req);
    
    const {householdNumber} = req.params;
    const updatedHousehold = req.body;

    try {

        const household = await Household.findOne({where: {householdNumber: householdNumber}})
        if (!household) {
            return res.json({ message: 'Household not found'});
        } 
        
        await household.update(updatedHousehold);  // Updatinng the household information

        return res.json({message: 'Household updated'});

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};