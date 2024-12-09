const LabResults = require('../../models/health_model/lab_results');
const path = require('path');

exports.viewLabResults = async (req, res) => {
    try {
        const records = await LabResults.findAll();

        if (!records || records.length === 0) {
            return res.status(404).json({ message: 'No records found' });
        }

        // Helper function to create URLs from stored file names
        const createUrlArray = (field) => {
            return field ? field.split(',').map(fileName => `/uploads/${encodeURIComponent(fileName)}`) : [];
        };

        // Enrich each record with URLs for the files
        const enrichRecordWithImageURLs = (record) => {
            const enrichedRecord = { ...record.dataValues };
            enrichedRecord.diagnosisUrls = createUrlArray(record.diagnosis);
            enrichedRecord.xrayUrls = createUrlArray(record.xray);
            enrichedRecord.ctscanUrls = createUrlArray(record.ctscan);
            enrichedRecord.ultrasoundUrls = createUrlArray(record.ultrasound);
            return enrichedRecord;
        };

        const enrichedRecords = records.map(enrichRecordWithImageURLs);

        res.json(enrichedRecords);
    } catch (error) {
        console.error('Error generating lab results JSON:', error);
        res.status(500).json({ message: 'Error generating lab results. Please try again later.' });
    }
};
