const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const User = require('../../../../../models/user_models/doctor_model');

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
}).single('avatarsrc'); // Use single instead of fields for updating profile picture

// Controller function for handling profile image updates
exports.updateDoctorProfileImage = async (req, res, user) => {
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

      // Get doctor record from the database using the user email
      const doctor = await Doctor.findOne({ email: user.email });
      if (!doctor) {
        return res.status(404).json({ message: 'doctor not found' });
      }

      // Update doctor record with uploaded profile picture URL
      if (req.file) {
        // Delete existing profile picture file if it exists
        if (doctor.avatarsrc) {
          fs.unlinkSync(doctor.profileImage);
        }
        // Update avatarsrc field with new path
        doctor.avatarsrc = req.file.path;
      }
      
      // Save changes to the database
      await doctor.save();

      // Send success response
      res.status(200).json({ message: 'Profile image updated successfully' });
    });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
