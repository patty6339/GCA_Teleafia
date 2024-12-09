
const Orders = require('../../../models/epharmacy_models/order_model/order_model');

exports.getPatientAllOrders = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Orders.findAll({where: {customerId: id}})

    if (!orders) {
      return res.status(404).json({ message: 'No Orders found' });
    }

    console.log(orders);

    res.json(orders);
  } catch (error) {

    console.log(error);
    res.status(500).json({ message: 'Internal server error' });

  }
};
