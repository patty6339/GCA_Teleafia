const Household = require('../../../models/chp_models/household_model');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

// Create a new household
exports.createHousehold = async (req, res) => {

    helper.log(req);
    
    try {
        const {householdDetailsData} = req.body
        const {socioEconomicData} = req.body 
        const {householdIllnessData} = req.body
        const {washData} = req.body
       // const {householdHealthProfileData} = req.body

        //console.log( req.body ); 

        if (!householdDetailsData || !householdDetailsData.householdNumber) {

            console.log('Missing householdNumber in request body')
            return res.status(400).json({ error: 'Missing householdNumber in request body' });
        }

        const householdNumber = householdDetailsData.householdNumber;

        const foundHousehold = await Household.findOne({ where: { householdNumber: householdNumber } });

        if (foundHousehold) {
            return res.status(400).json('Household already exists.');
        }

        // Combine different objects from the req.body into one object
        const newHouseholdData = {
            ...householdDetailsData,
            ...socioEconomicData,
            ...householdIllnessData,
            ...washData,
          //  ...householdHealthProfileData
        };

        console.log(newHouseholdData);

        await Household.create(newHouseholdData);

        res.status(201).json({message:"Household created successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
