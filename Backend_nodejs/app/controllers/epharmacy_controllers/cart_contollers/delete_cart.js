
const Cart = require('../../../models/epharmacy_models/cart_model/cart_model');
const Helper = require('../../../util/helpers')

const helper = new Helper();

//DELETE CART
exports.deleteCart = async (req, res) =>{

  helper.log(req);
  
  try {
    const userIdNumber = req.params;
    const cart = await Cart.findOne({ where : { userId : userIdNumber } });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    await cart.destroy();

    res.status(200).json({ message: 'Cart deleted successfully' });

  } catch (error) {
    
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });

  }
};


