const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const Patient = require('../../../../../models/user_models/patient_model'); // Assuming your model file is in the specified path

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
}).single('avatarSrc'); // Use single instead of fields for updating profile picture

// Controller function for handling profile image updates
exports.updatePatientProfileImage = async (req, res, user) => {
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

      // Get patient record from the database using the user email
      const patient = await Patient.findOne({ email: user.email });
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      // Update patient record with uploaded profile picture URL
      if (req.file) {
        // Delete existing profile picture file if it exists
        if (patient.avatarSrc) {
          fs.unlinkSync(patient.avatarSrc);
        }
        // Update profileImage field with new path
        patient.avatarSrc = req.file.path;
      }
      
      // Save changes to the database
      await patient.save();

      // Send success response
      res.status(200).json({ message: 'Profile image updated successfully' });
    });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
