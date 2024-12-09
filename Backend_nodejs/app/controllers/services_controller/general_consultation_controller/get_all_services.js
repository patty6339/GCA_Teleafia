const Service = require('../../../models/services_model/services_models')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.getAllServices = async (req,res) => {

  helper.log(req);

  try {
    const services = await Service.findAll();

    if(!services) {
      res.status(404).json({ message: 'No services found' });
      
    }
    return res.status(200).json({services});
    
  } catch (error) {
    console.error('Error getting services:', error);
    return res.status(500).json({ message: 'Error getting services', error: error.message });
  }
}