const Doctors = require('../../../models/user_models/doctor_model');

exports.deleteDoctor = async(req, res) => {
    const { doctorId } = req.params;

    try {
        
        const doctor = await Doctors.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        await doctor.destroy();
        return res.status(200).json({ message: 'Doctor deleted successfully' });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}