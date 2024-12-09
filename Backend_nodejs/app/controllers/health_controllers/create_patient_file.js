const fs = require('fs');
const path = require('path');
const PatientFile = require('../../models/health_model/patients_file');
const upload = require('./multer_config');
const Appointment = require('../../models/appointment_model/appointment_booking_model');
const Doctor = require('../../models/user_models/doctor_model')

exports.addPatientFile = (req, res, next) => {
    upload.fields([
        { name: 'labResults', maxCount: 1 },
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        const { labResults } = req.files;
        const { idNumber } = req.params;
        const {  date, time, revisitNo, doctorsNotes, treatment, remarks } = req.body;

        try {
            const patient = await Appointment.findOne({ where: { idNumber: idNumber } });
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }

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

            // Handle file upload
            // Handle file upload
            const labResultsFile = handleFileUpload(labResults);

            //get doctor's name

            const doctorId = patient.doctorId;

            const doctor = await Doctor.findOne({where:{doctorId: doctorId}});

            if(!doctor){
                return res.status(404).json({ message: 'Doctor not found' });
            }


            const patientFile = await PatientFile.create({
                name: patient.fullName,
                patientNo: patient.idNumber,
                gender: patient.gender,
                age: patient.age,
                contacts: patient.phoneNumber,
                serviceProvider: doctor.name,
                serviceProvider: doctor.name,
                date,
                time,
                revisitNo,
                doctorsNotes,
                treatment,
                remarks,
                labResults: labResultsFile
            });

            return res.status(201).json({ message: 'Patient file added successfully', patientFile });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to add patient file', error: error.message });
        }
    });
};