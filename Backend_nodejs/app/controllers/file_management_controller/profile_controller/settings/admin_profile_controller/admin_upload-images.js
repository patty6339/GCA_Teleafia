const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const User = require('../../../../../models/user_models/user_model'); // Assuming your model file is in the specified path


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:\\Users\\Adminstrator\\Desktop\\Backend-Project\\TeleAfya-Backend\\Uploads'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });


const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
}).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]);




exports.uploadAdminProfileImages = async (req, res, user) => {

  try {
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

    
      const admin = await User.findOne({email: user.email});
      if (!admin) {
        return res.status(404).json({ message: 'admin not found' });
      }
      
      // Update admin record with uploaded file URLs
  

      if (req.files['profilePicture']) {
        console.log(req.files);

        admin.profileImage = req.files['profilePicture'][0].path; // Assuming Multer saved the file path
      }
      if (req.files['backgroundImage']) {
        console.log(req.files);

        admin.backgroundImage = req.files['backgroundImage'][0].path; // Assuming Multer saved the file path
      }
      
      // Save changes to the database
      await admin.save();

      // Send success response
      res.status(200).json({ message: 'Profile images uploaded successfully' });
    });
  } catch (error) {
    console.error('Error uploading profile images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
