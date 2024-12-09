const Billing = require('../../models/payment_and_billing/billing_model');
const Product = require('../../models/epharmacy_models/product_model/product_model');
const Service = require("../../models/services_model/services_models");
const Patient = require('../../models/user_models/patient_model');
const Helpers = require('../../util/helpers');
const Appointments = require("../../models/appointment_model/appointment_booking_model");
const UniqueId = require('../../util/uniqueId');

const helper = new Helpers();
const generator = new UniqueId();

exports.addBillingWithServices = async (req, res) => {
    try {
        const customerId = req.body.idNumber;
        const products = req.body.products || [];
        const services = req.body.services || [];
        const appointmentId = req.body.appointmentId || null;

        console.log('Customer ID:', customerId);
        console.log('Customer ID:', customerId);
        console.log('Products:', products);
        console.log('Services:', services);
        console.log('Appointment ID:', appointmentId);

        if (!customerId) {
            return res.status(400).json({ error: 'customerId is required' });
        }

        const patient = await Patient.findOne({ where: { idNumber: customerId } });
        if (!patient) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!Array.isArray(services)) {
            return res.status(400).json({ error: 'Services must be an array' });
        }

        if (!Array.isArray(products)) {
            return res.status(400).json({ error: 'Products must be an array' });
        }

        
        const appointment = await Appointments.findOne({ where: { appointmentId : appointmentId } });

        let appointmentTotalServiceAmount = 0;
        if (appointment ) {
           // return res.status(404).json({ error: 'Appointment not found' });
           const appointmentServiceIds = appointment.service || [];

           console.log('Appointment Service IDs:', appointmentServiceIds);
   
           // Fetch service details from the database based on the service IDs in the appointment
           const appointmentServiceDetails = await Service.findAll({ where: { serviceId: appointmentServiceIds } });
   
           console.log('Appointment Service Details:', appointmentServiceDetails);
   
           // Calculate the total amount charged for services in the appointment
           let appointmentTotalServiceAmount = 0;
           appointmentServiceDetails.forEach(serviceDetail => {
               appointmentTotalServiceAmount += serviceDetail.amountCharged;
           });
   
           console.log('Appointment Total Service Amount:', appointmentTotalServiceAmount);
        }
        

        console.log('Appointment:', appointment);
        

        const productIds = products.map(product => product.productId);
        const productDetails = await Product.findAll({ where: { productId: productIds } });

        console.log('Product Details:', productDetails);

        const serviceIds = services.map(service => service.serviceId);
        const serviceDetails = await Service.findAll({ where: { serviceId: serviceIds } });

        console.log('Service Details:', serviceDetails);

        let totalServiceAmount = 0;
        services.forEach(service => {
            const serviceDetail = serviceDetails.find(s => s.serviceId === service.serviceId);
            if (serviceDetail) {
                totalServiceAmount += service.quantity * serviceDetail.amountCharged;
            }
        });

        console.log('Total Service Amount:', totalServiceAmount);

        let totalProductAmount = 0;
        products.forEach(product => {
            const productDetail = productDetails.find(p => p.productId === product.productId);
            if (productDetail) {
                totalProductAmount += product.quantity * productDetail.price;
            }
        });

        console.log('Total Product Amount:', totalProductAmount);

        const sumTotal = totalProductAmount + totalServiceAmount + appointmentTotalServiceAmount;

        console.log('Sum Total:', sumTotal);

        const billingId = generator.generateUniqueIdentifier();

        console.log('Billing ID:', billingId);
        console.log(appointment)

        const billingRecord = await Billing.create({
            billingId,
            customerName: patient.name,
            customerId: patient.idNumber,
            customerEmail: patient.email,
            customerPhoneNumber: patient.phoneNumber,
            appointment: appointmentId ? appointmentId : null,
            amountBilled: sumTotal,
            payBill: 174268,
            accNo: 2223333,
            paymentStatus: 'Pending',
            services,
            products
        });

        console.log('Billing Record:', billingRecord);

        res.status(201).json(billingRecord);

    } catch (error) {
        console.error('Error creating billing record:', error);
        res.status(500).json({ error: 'Failed to create billing record' });
    }
};
