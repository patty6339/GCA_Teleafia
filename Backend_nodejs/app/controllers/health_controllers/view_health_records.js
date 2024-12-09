const HealthRecord = require('../../models/health_model/health_records')

exports.viewHealthRecords = async(req, res) => {

    //find all health records
    try{
        const record = await HealthRecord.findAll()
        res.json(record)
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}