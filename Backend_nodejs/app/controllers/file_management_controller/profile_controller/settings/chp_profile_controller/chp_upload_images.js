const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const Chp = require('../../../../../models/user_models/chp_model')

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:\\Users\\Adminstrator\\Desktop\\Backend-Project\\TeleAfya-Backend\\Uploads'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

// Initialize multer upload with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Limiting file size to 5MB
}).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]);

// Controller function for handling file uploads and updating database


exports.chpUploadProfileImages = async (req, res, user) => {

  try {
    // Get chp record from the database using the user email
    const chp = await Chp.findOne({email: user.email});
    if (!chp) {
      return res.status(404).json({ message: 'chp not found' });
    }  
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

      
      
      // Update chp record with uploaded file URLs
  

      if (req.files['avatarsrc']) {
        console.log(req.files);

        chp.profileImage = req.files['avatarsrc'][0].path; // Assuming Multer saved the file path
      }
      if (req.files['backgroundImage']) {
        console.log(req.files);

        chp.backgroundImage = req.files['backgroundImage'][0].path; // Assuming Multer saved the file path
      }
      
      // Save changes to the database
      await chp.save();

      // Send success response
      res.status(200).json({ message: 'avatarsrc uploaded successfully' });
    });
  } catch (error) {
    console.error('Error uploading profile images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
