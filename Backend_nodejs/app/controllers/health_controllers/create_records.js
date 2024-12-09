const HealthRecord = require('../../models/health_model/health_records')


exports.createRecord = async(req, res) => {
    const { date, systolic, diastolic, weight, height} = req.body;

    try {
        
        // Handle file upload
        const resultFilePath = req.file ? req.file.path : null;

        // Save data to database
        const healthRecord = new HealthRecord({
            date,
            systolic,
            diastolic,
            weight,
            height,
            resultFilePath // Save file path in the database
        });

        await healthRecord.save();

        res.status(200).send('Record submitted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
