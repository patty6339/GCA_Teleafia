const Household = require('../../../models/chp_models/household_model');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();
// Get all households
exports.getAllHouseholds= async (req, res) => {

    helper.log(req);

    try {

        const households = await Household.findAll();

        res.json(households);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};