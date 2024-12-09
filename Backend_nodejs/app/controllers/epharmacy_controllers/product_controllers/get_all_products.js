const Products = require('../../../models/epharmacy_models/product_model/product_model');
const Helper = require('../../../util/helpers');

const helper = new Helper();

// GET ALL PRODUCTS WITH IMAGE URL
exports.getAllProducts = async (req, res) => {
    helper.log(req);

    try {
        // Fetch all products from the database
        const productData = await Products.findAll();

        // Construct details for each product
        const products = productData.map(product => {
            // Assuming 'image' field contains the image filename
            const imageUrl = `${process.env.IP_ADRESS}:5500/images/${product.image}`;
            
            return {
                id : product.productId,
                imageUrl,
                name: product.name,
                category:product.category,
                quantity: product.quantity,
                description: product.description,
                price: product.price,
                
            }
        });

        // Send the array of product data to the frontend
        res.status(200).json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
