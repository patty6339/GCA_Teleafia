
const Cart = require('../../../models/epharmacy_models/cart_model/cart_model');
const Helper = require('../../../util/helpers')

const helper = new Helper();

//GET ALL USER CARTS
exports.getAllUserCarts = async (req, res) =>  {

  helper.log(req)

  try {
    
    const allUsersCarts = await Cart.findAll();

    if (!allUsersCarts) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json({ allUsersCarts });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });

  }
};