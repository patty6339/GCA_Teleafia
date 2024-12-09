
// const Product  = require('../../../models/epharmacy_models/product_model/product_model');
// const Helper = require('../../../util/helpers')
// const UniqueId = require('../../../util/uniqueId');

// const helper = new Helper()
// const uniqueId= new UniqueId()

// exports.createNewProduct = async (req, res) => {

//   helper.log(req)

//   const { name, description, category, price, image,quantity } = req.body;

//   try {

//     if (!name || !description || !category|| !price || !quantity) {
//       return res.status(400).json({ message: 'all products are required' });
//     }
//     // Check if the product already exists
//     const product = await Product.findOne({ where: { name: name } });

//     console.log(product)

//     if (product) {
//       return res.status(400).json({ message: 'Product with that Name already exists' });
//     }

//     const productId = uniqueId.generateUniqueIdentifier('MP')

//     // Attempt to create the product
//     const newProduct = await Product.create({
//       productId : productId,
//       name,
//       description,
//       image,
//       category,
//       price,
//       quantity,
//     });

//     newProduct.save();

//     return res.status(201).json({ message: 'Product created successfully', newProduct });
    
//   } catch (error) {
//     // // Handle specific error cases
//     // if (error.name === 'SequelizeUniqueConstraintError') {

//     //   console.log(error.message)
//     //   return res.status(400).json({ error: 'Product with the same title already exists' });
//     // }

//     // Handle other errors
//     console.error('Error creating product:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };


const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../../../models/epharmacy_models/product_model/product_model');
const Helper = require('../../../util/helpers');
const UniqueId = require('../../../util/uniqueId');

const helper = new Helper();
const uniqueId = new UniqueId();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:\\Users\\abisa\\Desktop\\TeleAfya\\Teleafia_V1\\Backend_nodejs\\Uploads'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer upload with the storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limiting file size to 5MB
}).single('image'); // Use 'image' as the field name for file input

// Controller function for creating a new product
exports.createNewProduct = async (req, res) => {
    // Execute multer upload middleware
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            console.log(err);
            return res.status(400).json({ message: 'File upload error', error: err.message });
        } else if (err) {
            // An unknown error occurred
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }

        // Continue with product creation logic
        try {
            const { name, description, category, price, quantity } = req.body;

            if (!name || !description || !category || !price || !quantity) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Check if the product already exists
            const existingProduct = await Product.findOne({ where: { name: name } });

            if (existingProduct) {
                return res.status(400).json({ message: 'Product with that name already exists' });
            }

            const productId = uniqueId.generateUniqueIdentifier('MP');

            // Create the product
            const newProduct = await Product.create({
                productId: productId,
                name,
                description,
                image: req.file ? req.file.filename : null, // Save the uploaded image file name
                category,
                price,
                quantity,
            });

            await newProduct.save();

            return res.status(201).json({ message: 'Product created successfully', newProduct });

        } catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
};
