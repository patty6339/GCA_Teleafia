const Clinic = require('../../models/teleafya_clinics_model/teleafya_clinic_model');
const Helpers = require('../../util/helpers');
const UniqueId = require('../../util/uniqueId');

const helper = new Helpers();
const uniqueId = new UniqueId();

exports.addTeleafyaClinic = async (req, res) => {

    helper.log(req);
    
    try {
        const { name, address, location, services } = req.body;

        // Check if the clinic already exists
        const clinic = await Clinic.findOne({ where: { name: name } });

        if (clinic) {
            return res.status(400).json({ message: 'Clinic already exists' });
        }

        // Create a new clinic record
        const newClinic = await Clinic.create({
            clinicId: uniqueId.generateUniqueIdentifier('CL'),
            name,
            address,
            location,
            services,
        });

        res.status(201).json(newClinic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding clinic' });
    }
};
