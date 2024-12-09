
const Order = require('../../../models/epharmacy_models/order_model/order_model');

exports.getAllOrders = async (req, res) => {

  try {
    const orders = await Order.findAll();

    if(!orders) {
      res.status(404).json({ message: 'No orders found' });
      
    }

    res.json(orders);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}