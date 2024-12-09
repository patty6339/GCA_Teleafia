
const Receipt = require('../../models/payment_and_billing/receipt')


exports.createPaymentReceipt = async(req, res) => {
  try {
    const { DatePaid, UserId, Status, Amount, TransactionId } = req.body;

    // Validate required fields
    if (!UserId || !Amount || !TransactionId) {
      return res.status(400).json({ message: 'UserId, Amount, and TransactionId are required fields.' });
    }

    // Create a new receipt record
    const newReceipt = await Receipt.create({
      DatePaid: DatePaid || new Date(),
      UserId,
      Status: Status || 'Unpaid',
      Amount,
      TransactionId
    });
    await newReceipt.save();

    return res.status(201).json({message: "Successfully created"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating receipt' });
  }
}
