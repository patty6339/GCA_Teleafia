
const Order = require('../../../models/epharmacy_models/order_model/order_model');
const Product = require('../../../models/epharmacy_models/product_model/product_model');
const Patient = require('../../../models/user_models/patient_model');
const Helpers = require('../../../util/helpers')
const UniqueId = require("../../../util/uniqueId")

const helper = new Helpers();
const uniqueId = new UniqueId();

exports.addOrderWithProducts = async (req, res) => {
    try {

        const {customerId} = req.params
        const { products } = req.body;

        const patient = await Patient.findOne({ where: { idNumber: customerId } });

        if (!patient) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate that products is an array
        if (!Array.isArray(products)) {
            return res.status(400).json({ error: 'Products must be an array' });
        }

        // Fetch the cost of each product from the database
        const productIds = products.map(product => product.productId);
        const productCosts = await Product.findAll({ where: { productId: productIds } });

        // Calculate the total amount billed
        let totalAmount = 0;
        for (const product of products) {
            const productCost = productCosts.find(pc => pc.productId === product.productId);
            if (productCost) {
                totalAmount += product.quantity * productCost.cost;
            }
        }

        const orderId = uniqueId.generateUniqueIdentifier();

        // Create order record
        const orderRecord = await Order.create({
            orderId : orderId,
            customerId: patient.idNumber,
            customerName: patient.name,
            customerPhoneNumber: patient.phoneNumber,
            customerEmail: patient.email,
            products: products,
            amountBilled: totalAmount,
        });

        res.status(201).json(orderRecord);

    } catch (error) {
        console.error('Error creating order record:', error);
        res.status(500).json({ error: 'Failed to create order record' });
    }
};
