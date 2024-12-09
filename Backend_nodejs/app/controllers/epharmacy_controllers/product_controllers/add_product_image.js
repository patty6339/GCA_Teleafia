
const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const Product = require('../../../models/epharmacy_models/product_model/product_model'); // Assuming your model file is in the specified path

// Controller function for handling profile image updates
exports.productImageUpload = async (req, res ) => {
  try {

  const {id} = req.params

      // Get admin record from the database using the user email
      const product = await Product.findOne({ where :{ productId: id }});
      if (!product) {
        return res.status(404).json({ message: 'product not found' });
      }

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
        }).single('image'); // Use single instead of fields for updating profile picture
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

      if (req.file) {
        // Delete existing picture file if it exists
        if (product.image && fs.existsSync(product.image)) {
          fs.unlinkSync(product.image);
        }
        
        // Update profileImage field with new path
        product.image = req.file.filename;

        console.log("Requested file is : " + req.file);
      }
      
      // Save changes to the database
      await product.save();

      // Send success response
      res.status(200).json({ message: 'Product image updated successfully' });
    });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
