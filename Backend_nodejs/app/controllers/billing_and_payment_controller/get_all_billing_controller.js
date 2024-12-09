const Billing = require('../../models/payment_and_billing/billing_model');

exports.getAllBillings = async (req, res) => {

  try {
    const billings = await Billing.findAll();

    if(!billings) {
      res.status(404).json({ message: 'No billings found' });
      
    }

    res.json(billings);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}