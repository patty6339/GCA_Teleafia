
const Orders = require('../../../models/epharmacy_models/order_model/order_model');

exports.cancelOrder = async (req, res) => {
  try {
    const {orderId } = req.params;
    //const orderId= req.body;

    const order = await Orders.findOne({where: {orderId: orderId}})

    if (!order) {
      return res.status(404).json({ message: 'Order wiyh that Id not found' });
    }

    // Change the status of the order
    order.orderStatus = 'Cancelled'
    order.save();

    return res.status(200).json("Order cancelled successfully")
  } catch (error) {

    console.log(error);
    res.status(500).json({ message: 'Internal server error' });

  }
};
