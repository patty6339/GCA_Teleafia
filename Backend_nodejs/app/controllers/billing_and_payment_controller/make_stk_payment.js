const axios = require('axios');
const moment = require('moment');
const Billing = require('../../models/payment_and_billing/billing_model');
const Appointment = require('../../models/appointment_model/appointment_booking_model');
const Payment = require('../../models/payment_and_billing/payment_model')
const Service = require("../../models/services_model/services_models");
const Helpers = require('../../util/helpers');
const Generator = require('../../util/uniqueId');
require('dotenv').config();

const helper = new Helpers();
const generator = new Generator();

exports.makeStkPayment = async (req, res, next) => {
    helper.log(req);

    try {
        const { id } = req.params;
        const { mobileNumber } = req.body;

        let toPay = await Billing.findOne({ where: { billingId: id } });
        let appointmentTotalServiceAmount = 0;
        let appointment = await Appointment.findOne({ where: { appointmentId: id } });

        if (!toPay) {
            if (!appointment) {
                return res.status(404).json({ error: 'Appointment not found' });
            }

            const appointmentServiceIds = appointment.service || [];
            const appointmentServiceDetails = await Service.findAll({ where: { serviceId: appointmentServiceIds } });

            appointmentServiceDetails.forEach(serviceDetail => {
                appointmentTotalServiceAmount += serviceDetail.amountCharged;
            });
        }

        const amountToPay = appointmentTotalServiceAmount || toPay?.amountBilled || 0;
        const transactionId = generator.generateUniqueIdentifier();
        const Id = generator.generateUniqueIdentifier();

        const secret = process.env.MPESA_SECRET_KEY;
        const consumerKey = process.env.MPESA_CONSUMER_KEY;
        const auth = Buffer.from(`${consumerKey}:${secret}`).toString("base64");

        const tokenResponse = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });

        const token = tokenResponse.data.access_token;
        const timestamp = moment().format('YYYYMMDDHHmmss');

        const phone = mobileNumber.length > 1 ? mobileNumber.substring(1) : mobileNumber;
        const shortcode = process.env.MPESA_PAYBILL;
        const passkey = process.env.MPESA_PASSKEY;
        const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

        const stkPushResponse = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amountToPay,
            PartyA: phone,
            PartyB: shortcode,
            PhoneNumber: `254${phone}`,
            CallBackURL: 'https://f13e-102-210-244-174.ngrok-free.app/api/callback',
            AccountReference: `254${phone}`,
            TransactionDesc: 'test'
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log({stkPushResponse});

        const customerId = toPay?.customerId || (appointment && appointment.idNumber) || null;
        const customerName = toPay?.customerName || (appointment && appointment.fullName) || null;
        const customerEmail = toPay?.customerEmail || null;
        const products = toPay?.products || null;
        const services = toPay?.services || appointment?.service || null;

        const paymentRecord = await Payment.create({
            amountBilled: amountToPay,
            amountPaid: amountToPay,
            customerId: customerId,
            customerName: customerName,
            customerEmail: customerEmail,
            products : products,
            services : services,
            paymentMethod: 'M-Pesa',
            transactionId: transactionId,
            paymentStatus: stkPushResponse.status
        });
        
        const { data } = stkPushResponse;
        const responseToSend = {
            MerchantRequestID: data.MerchantRequestID,
            CheckoutRequestID: data.CheckoutRequestID,
            ResponseCode: data.ResponseCode,
            ResponseDescription: data.ResponseDescription,
            CustomerMessage: data.CustomerMessage
        };

        return res.status(200).json(responseToSend);

    } catch (error) {
        console.error('Error creating payment record:', error);
        res.status(500).json({ error: 'Failed to create payment record' });
    }
};
