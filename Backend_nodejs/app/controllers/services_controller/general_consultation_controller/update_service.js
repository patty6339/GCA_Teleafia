const Service = require('../../../models/services_model/services_models')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.updateService = async (req, res) => {

  helper.log(req);

  try {

    const {id} = req.body
    const service = await Service.findOne({where: {serviceId: id }});

    if (!service) {
        return res.status(404).json({ message: 'Service not found' });
    }

    await service.update(req.body);
    res.status(200).json(service);
    
  } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};