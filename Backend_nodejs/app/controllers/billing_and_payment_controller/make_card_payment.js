
const Billing = require('../../models/payment_and_billing/billing_model');
const Stripe = require('stripe');
const Helpers = require('../../util/helpers');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const helper = new Helpers();

exports.makeCardPayment = async (req, res) => {
    try {
        // Extract request body data
        const { billingId } = req.params;

        // Retrieve billing record
        const billingRecord = await Billing.findOne({ where: { billingId: billingId } });

        if (!billingRecord) {
            return res.status(404).json({ error: 'Billing record not found' });
        }

        // Calculate amount to pay
        const amountToPay = billingRecord.amountBilled;

        // Generate transaction ID
        const transactionId = helper.generateTransactionId();

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Total bill',
                    },
                    unit_amount: amountToPay
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:5173/paymenmts',
            cancel_url: 'http://localhost:5173/payments',
            metadata: {
                billingId: billingId,
                transactionId: transactionId
            }
        });

        res.send({ url: session.url });
    } catch (error) {
        console.error('Error making card payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
