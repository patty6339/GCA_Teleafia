
const Cart = require('../../../models/epharmacy_models/cart_model/cart_model');
const User = require('../../../models/user_models/patient_model');
const Helper = require('../../../util/helpers')

const helper = new Helper();

//GET USER CART
exports.getUserCart = async (req, res) =>  {

  helper.log(req)

  const userIdNumber = req.params;

  try {
    const patientCart = await Cart.findOne({ where : { userId : userIdNumber }});
    const patient = await User.findOne({ where : { idNumber : userIdNumber }})

    if (!patientCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const patientName = patient.name;

    res.status(200).json({ patientName, userCart});
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};