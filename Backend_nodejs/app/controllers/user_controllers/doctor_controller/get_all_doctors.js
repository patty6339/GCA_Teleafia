
const Doctors = require('../../../models/user_models/doctor_model');

// View all household members
exports.getAllDoctors = async (req, res) => {

  try {
    const doctors = await Doctors.findAll();

    if(doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found' });
    }

    res.status(200).json(doctors);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    
  }
};






