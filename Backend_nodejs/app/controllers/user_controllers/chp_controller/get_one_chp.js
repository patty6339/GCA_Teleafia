
const CHPS = require('../../../models/user_models/chp_model');

exports.getOneChp = async (req,res) => {

  try {

    const id = req.params;

    const chp = await CHPS.findOne({where : {idNumber: id}});
    
    if (!chp) {
      return res.status(404).json({ message: 'CHP not found' });
    }
    
    return res.status(200).json(chp);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
}