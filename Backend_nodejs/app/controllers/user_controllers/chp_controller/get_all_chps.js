
const Chp = require('../../../models/user_models/chp_model');




// View all household members
exports.getAllChps = async (req, res) => {

  try {
    const chp = await Chp.findAll();

    res.json(chp);

  } catch (error) {
   
    res.status(500).json({ error: 'Server error' });
    
  }
};






