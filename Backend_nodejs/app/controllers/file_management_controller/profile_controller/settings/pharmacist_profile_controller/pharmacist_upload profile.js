const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Using fs.promises for async file operations
const Pharmacist = require('../../../../../models/user_models/pharmacist_model');

// Controller function for handling file uploads and updating database
exports.uploadPharmacistProfileImage = async (req, res) => { 
  try {
    const { id } = req.params;

    // Find the patient by id
    const pharmacist = await Pharmacist.findOne({ where: { idNumber: id } });
    if (!pharmacist) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads');
      },
      filename: async function (req, file, cb) {
        const existingFilePath = pharmacist.avatarSrc ? path.join(__dirname, '../../../../../', pharmacist.avatarSrc) : null;
        // If an existing file exists, delete it
        // if (existingFilePath) {
        //   try {
        //     await fs.unlink(existingFilePath);
        //   } catch (unlinkError) {
        //     console.error('Error deleting existing image:', unlinkError);
        //   }
        // }
        // Generate a unique filename for the new file
        cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
      }
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
    }).single('avatarSrc'); // Using .single() to ensure only one file is uploaded

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(400).json({ message: 'File upload error', error: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }

      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded'});
      }

      // Construct the file path
    // const avatarSrcPath = path.join(`https://4de1-102-210-244-74.ngrok-free.app/images/${file.originalname}`, req.file.filename);
 
   const avatarSrcPath = req.file.filename


      // Update pharmacist's avatarSrc field with the file path
      patient.avatarSrc = avatarSrcPath;

      // Save changes to the database
      await pharmacist.save();

      console.log("Updated pharmacist's avatarSrc")

      // Send success response with file path
      res.status(200).json({ message: 'Image uploaded successfully', avatarSrc: avatarSrcPath });
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
