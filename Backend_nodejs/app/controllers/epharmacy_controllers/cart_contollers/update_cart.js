
const Cart = require('../../../models/epharmacy_models/cart_model/cart_model');
const Helper = require('../../../util/helpers')

const helper = new Helper();

//UPDATE CART
exports.updateUserCart = async (req, res) => {

  helper.log(req)
  
  try {
    const userIdNumber = req.params; 
    const { products } = req.body; 

    // Find the cart by userIdNumber
    const cart = await Cart.findOne({ where : { userId : userIdNumber } });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Update the products array in the cart
    cart.products = products;

    // Save the updated cart
    const updatedCart = await products.save();

    res.status(200).json({ updatedCart });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal server error' });

  }
};