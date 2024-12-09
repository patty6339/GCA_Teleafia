const Patient = require('../../../models/user_models/patient_model');

const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.deletePatient = async(req, res) => {
    helper.log(req);

    try {
        const { id } = req.params;

        const patient = await Patient.findOne({ where: { idNumber:id}})
        if(!patient){
            return res.status(404).json({ message: 'Patient not found' });
        }
        
        await patient.destroy();
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}