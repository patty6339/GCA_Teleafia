const Doctor = require('../../../models/user_models/doctor_model');

exports.getOneDoctor = async(req, res) => {
    try {
        const {doctorId} = req.params;

        const doctor = await Doctor.findByPk(doctorId);
        if(!doctor){
            return res.status(404).json({message: 'Doctor not found'});
        }
        return res.status(200).json(doctor);

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Server error'});
    }
}