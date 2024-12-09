const Billing = require('../../models/payment_and_billing/billing_model');

exports.getPatientAllBillings = async (req, res) => {
  try {
    const { id } = req.params;

    const billings = await Billing.findAll({where : { customerId: id}})

    if (!billings) {
      return res.status(404).json({ message: 'No billings found' });
    }

    res.json(billings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
