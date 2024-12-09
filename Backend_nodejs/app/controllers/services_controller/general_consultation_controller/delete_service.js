
const Service = require('../../../models/services_model/services_models')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();
exports.deleteService = async (req, res) => {

  helper.log(req);

  try {

      const {id} = req.body

      const service = await Service.findOne({where: {serviceId: id }})

      if (!service) {
          return res.status(404).json({ message: 'Service not found' });
      }

    service.isDeleted = true;
    await service.save();

    res.status(200).json({ message: 'Service deleted successfully' });

  } catch (error) {

      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Error deleting service', error: error.message });
      
  }
};