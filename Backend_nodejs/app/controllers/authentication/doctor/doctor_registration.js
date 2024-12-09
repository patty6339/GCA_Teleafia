const bcryptjs = require('bcryptjs');
const Doctor = require('../../../models/user_models/doctor_model');
const Helpers = require('../../../util/helpers'); // Import the Helpers class
const Role=require('../../../models/user_models/roles')

// Create an instance of the Helpers class
const helper = new Helpers();

// DOCTOR REGISTRATION
exports.registerDoctors = async (req, res) => {

  helper.log(req);
  
  const { name, email, phoneNumber, idNumber, password, specialization, licenseNo } = req.body;

  try {
    // Check if the doctor is already registered
    const doctor = await Doctor.findOne({ where: { email: email } });

    if (doctor) {
      return res.status(400).json('User already exists, Log in instead');
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password);

    // Expiration date (Days)
    const expirationDate = new Date();
    const validDays = 90;
    expirationDate.setDate(expirationDate.getDate() + validDays);


    const doctorId = await helper.generateUniqueIdentifier('D')
    // Save user details 
    const newDoctor = new Doctor({
      doctorId,
      name,
      email,
      phoneNumber,
      idNumber,
      specialization,
      licenseNo,
      password: hashedPassword,
      profileType:"DOCTOR",
      passOtp : null,
      passwordExpirationDate: expirationDate,
      role : {
        'User': 1000,
        'Doctor': 4000, 
      }, 
      Permissions: {}
    });

    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
