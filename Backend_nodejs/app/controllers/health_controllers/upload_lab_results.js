
const LabResults = require('../../models/health_model/lab_results');
const fs = require('fs');
const path = require('path');
const upload = require('../../controllers/health_controllers/multer_config'); // Adjust the path if necessary

exports.uploadLabResults = (req, res) => {
    upload.fields([
        { name: 'xray', maxCount: 1 },
        { name: 'ctscan', maxCount: 1 },
        { name: 'ultrasound', maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        const { xray, ctscan, ultrasound } = req.files;
        const { diagnosis } = req.body;

        try {
            // Define the directory where files will be stored
            const uploadDirectory = path.join(__dirname, '../../../uploads');

            // Ensure the upload directory exists
            if (!fs.existsSync(uploadDirectory)) {
                fs.mkdirSync(uploadDirectory, { recursive: true });
            }

            // Helper function to handle file upload and return the file URL
            const handleFileUpload = (fileArray) => {
                if (fileArray && fileArray.length > 0) {
                    const file = fileArray[0];
                    const fileName = `${Date.now()}_${file.originalname}`;
                    const filePath = path.join(uploadDirectory, fileName);
                    fs.renameSync(file.path, filePath);
                    return fileName;
                }
                return null;
            };

            // Handle file uploads for each category
            const xrayFile = handleFileUpload(xray);
            const ctscanFile = handleFileUpload(ctscan);
            const ultrasoundFile = handleFileUpload(ultrasound);

            // Create new lab results entry in the database with image file URLs
            const labResults = await LabResults.create({
                diagnosis,
                xray: xrayFile,
                ctscan: ctscanFile,
                ultrasound: ultrasoundFile
            });

            // Send success response
            res.status(200).json({ message: 'Lab Results Uploaded Successfully', labResults });

        } catch (error) {
            // Handle errors
            console.error('Error uploading lab results:', error);
            res.status(500).json({ message: 'Error uploading lab results', error: error.message });
        }
    });
};
