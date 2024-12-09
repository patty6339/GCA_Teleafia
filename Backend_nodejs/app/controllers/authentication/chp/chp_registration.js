
const bcryptjs = require('bcryptjs');
const Chp = require('../../../models/user_models/chp_model');
const Helpers = require('../../../util/helpers'); // Import the Helpers class

// Create an instance of the Helpers class
const helper = new Helpers();

// CHP REGISTRATION
exports.registerChps = async (req, res) => {

  helper.log(req);
  
  const { name, email, phoneNumber, idNumber,location, password } = req.body;

  try {
    // Check if the chp is already registered
    const chp = await Chp.findOne({ where: { email: email } });

    if (chp) {
      return res.status(400).json('CHP already exists');
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password);

    // Expiration date (Days)
    const expirationDate = new Date();
    const validDays = 90;
    expirationDate.setDate(expirationDate.getDate() + validDays);


    // Save user details 
    const newChp = new Chp({
      name,
      email,
      phoneNumber,
      idNumber,
      location,
      password: hashedPassword,
      expiredPassOtp : null,
      passwordExpirationDate: expirationDate,
      role : {
        'User': 1000,
        'Chp': 3000, 
      }, 
      Permissions: {},
      notifications : ''
    });

    await newChp.save();

    res.status(201).json({ message: 'CHP created successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
