const Service = require('../../../models/services_model/services_models')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.createService = async (req, res) => {

    helper.log(req);
    
    try {

        const serviceId = await helper.generateUniqueIdentifier('S');

         const service = await Service.findOne({ where : { serviceId : serviceId }})

        if (service) {
             return res.status(400).json({ message: 'Service with this Service Id already exists' });
         }

        const generalConsultationService = await Service.findOne({where :{ name : req.body.name }})
        
        if (generalConsultationService) {
            return res.status(400).json({ message: 'Service with this name already exists' });
        };

        const newGeneralConsultationService = await Service.create({
            serviceId: serviceId,
            name: req.body.name,
            description: req.body.description
        });

        await newGeneralConsultationService.save();
        
        res.status(201).json(newGeneralConsultationService);

    } catch (error) {

        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Error creating service', error: error.message });

    }
};