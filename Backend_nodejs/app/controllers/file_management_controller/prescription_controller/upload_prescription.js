const multer = require('multer');
const path = require('path');
const Prescription = require('../../../models/prescription/prescription');
const Patient = require('../../../models/user_models/patient_model');
const Generator = require('../../../util/uniqueId');
const Helper = require('../../../util/helpers');
require('dotenv').config();

const generator = new Generator();
const helper = new Helper();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.ABBIE_PATH); // Ensure this is defined in your .env file
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer upload with the storage configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limiting file size to 5MB
}).array('prescription-image', 10); // Allow up to 10 files

// Controller function for handling prescription image uploads
exports.prescriptionImageUpload = async (req, res) => {
    helper.log(req);

    try {
        const { id } = req.params;

        // Get patient record from the database
        const patient = await Patient.findOne({ where: { idNumber: id } });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
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

            // Generate a unique prescription ID
            const prescriptionId = generator.generateUniqueIdentifier();

            // Collect all uploaded image filenames
            const imagePaths = req.files.map(file => file.filename);

            // Create a new prescription entry with multiple images
            const prescription = new Prescription({
                prescriptionId: prescriptionId,
                patientName: patient.name,
                patientEmail: patient.email,
                patientId : patient.idNumber,
                images: imagePaths // Store the array of image filenames
            });

            // Save prescription to the database
            await prescription.save();

            // Send success response
            res.status(200).json({ message: 'Prescription images uploaded successfully', prescription });
        });
    } catch (error) {
        console.error('Error uploading prescription images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
