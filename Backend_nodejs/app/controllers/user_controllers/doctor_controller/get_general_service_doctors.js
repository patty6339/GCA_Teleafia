const { Op } = require('sequelize');
const Doctors = require('../../../models/user_models/doctor_model');

// View all general service doctors
exports.getAllGeneralServiceDoctors = async (req, res) => {
  try {
    const doctors = await Doctors.findAll({
      where: {
        [Op.or]: [
          { specialization: 'Medical officer' },
          { specialization: 'Clinical officer' }
        ]
      }
    });

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No general service doctors found' });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
