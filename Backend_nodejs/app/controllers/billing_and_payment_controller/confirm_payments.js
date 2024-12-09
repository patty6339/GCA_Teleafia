const Payment = require('../../models/payment_and_billing/payment_model');
const Billing = require('../../models/payment_and_billing/billing_model');

exports.confirmPayments = async (req, res) => {
  try {
    const { billingId, appointmentId } = req.params;
    const { transactionId } = req.body;

    // Find the payment record based on the provided transactionId
    const paymentRecord = await Payment.findOne({ where: { transactionId } });

    
    if (!paymentRecord) {
      return res.status(404).json({ error: 'Payment record not found' });
    }

    // Validate the transactionId matches the payment record
    if (transactionId !== paymentRecord.transactionId) {
      return res.status(400).json({ error: 'Transaction ID does not match payment record' });
    }

    // Retrieve the billing record associated with the payment
    let billingRecord;
    if (billingId) {
      billingRecord = await Billing.findOne({ where: { id: billingId } });
    } else if (appointmentId) {
      billingRecord = await Billing.findOne({ where: { appointmentId : appointmentId } });
    }

    if (!billingRecord) {
      return res.status(404).json({ error: 'Billing record not found' });
    }

    // Update billing status to 'Paid' if the total amount is paid
    const totalAmount = billingRecord.amountBilled;
    const totalPaid = await Payment.sum('amountPaid', { where: { billingId: billingRecord.id } });
    if (totalPaid >= totalAmount) {
      await billingRecord.update({ paymentStatus: 'Paid' });
    }

    res.status(200).json({ message: 'Payment confirmed successfully' });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
};
