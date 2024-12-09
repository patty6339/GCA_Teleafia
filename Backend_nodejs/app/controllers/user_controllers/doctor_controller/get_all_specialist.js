const Doctor = require('../../../models/user_models/doctor_model');
const { Op } = require('sequelize');

exports.getSpecialist = async (req, res) => {
    try {
        const specialists = await Doctor.findAll({
            where: {
                specialization: {
                    [Op.notIn]: ["Medical Officer", "Clinical Officer"]
                }
            }
        });
        if (!specialists.length) { 
            return res.status(404).json({ message: "No specialists found." });
        }

        return res.status(200).json({ specialists });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
