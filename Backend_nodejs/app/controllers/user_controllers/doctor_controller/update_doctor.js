const Doctor = require('../../../models/user_models/doctor_model');

exports.updateDoctor = async(req, res) => {
    const { doctorId } = req.params;

    try {
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        
        await doctor.update({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            idNumber: req.body.idNumber,
            specialization: req.body.specialization,
            licenseNo: req.body.licenseNo,
            password: req.body.password,
        });
        return res.status(200).json({message: 'Doctor updated successfully', updatedDoctor});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}