const Household = require('../../../models/chp_models/household_model');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

// Delete a household
exports.deleteHousehold= async (req, res) => {

    helper.log(req);
    
    const {householdNumber} = req.params;

    try {

        const household = await Household.findOne({where: {householdNumber: householdNumber}})
        if (!household) {
            res.json({ message: 'Household not found'})
        }

        await household.destroy();
        
        res.json({ message: 'Household deleted'});

    } catch (error) {
        console.log(error); // Debbug
        res.status(500).json({ message: error.message });
    }
}