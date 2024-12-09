
const bcryptjs = require('bcryptjs');
const SuperAdmin = require('../../../models/user_models/user_model');
const Helpers = require('../../../util/helpers'); 


// Create an instance of the Helpers class
const helper = new Helpers();

// ADMIN REGISTRATION
exports.registerSuperAdmins = async (req, res) => {

  helper.log(req);
  
  const { name, email, phoneNumber, idNumber, password } = req.body;

  try {
    // Check if the admin is already registered
    const superAdmin = await SuperAdmin.findOne({ where: { email: email } });

    if (superAdmin) {
      return res.status(400).json('User already exists, Log in instead');
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password);

    // Expiration date (Days)
    const expirationDate = new Date();
    const validDays = 90;
    expirationDate.setDate(expirationDate.getDate() + validDays);


    // Save admin details
    const newSuperAdmin = new SuperAdmin({
      name,
      email,
      phoneNumber,
      idNumber,
      password: hashedPassword,
      isInitialPasswordChanged: true,
      profileType :"SUPERADMIN",
      role: {
        'ADMIN': 6000,
        'PATIENT': 2000,
        'CHP': 3000, 
        'SUPERADMIN' : 6500, 
        'EDITOR': 5000,
        'DOCTOR': 4000,
        'USER': 1000,
     },
      permissions : {},
      passwordExpirationDate: expirationDate 
    });

    await newSuperAdmin.save();

    return res.status(201).json({ message: 'Super Admin created successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
