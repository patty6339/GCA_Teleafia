
const bcryptjs = require('bcryptjs');
const Admin = require('../../../models/user_models/user_model');
const Helpers = require('../../../util/helpers'); 


// Create an instance of the Helpers class
const helper = new Helpers();

// ADMIN REGISTRATION
exports.registerAdmins = async (req, res) => {

  helper.log(req);
  
  const { name, email, phoneNumber, idNumber, password } = req.body;

  try {
    // Check if the admin is already registered
    const admin = await Admin.findOne({ where: { email: email } });

    if (admin) {
      return res.status(400).json('User already exists, Log in instead');
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password);

    // Expiration date (Days)
    const expirationDate = new Date();
    const validDays = 90;
    expirationDate.setDate(expirationDate.getDate() + validDays);


    // Save admin details
    const saveAdmin = new Admin({
      name,
      email,
      phoneNumber,
      idNumber,
      password: hashedPassword,
      profileType :"ADMIN",
      role: {
        "User": 1000,
        "Admin": 6000,
        "editor" : 5000
    },
      permissions :{},
      passwordExpirationDate: expirationDate 
    });

    await saveAdmin.save();

    return res.status(201).json({ message: 'Admin created successfully' ,admin});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
