const Service = require('../../../models/services_model/services_models')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.createGeneralConsultationService = async (req, res) => {

    helper.log(req);
    
    try {
        const generalConsultationService = await Service.create(req.body);
        res.status(201).json(generalConsultationService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Error creating service', error: error.message });
    }
};