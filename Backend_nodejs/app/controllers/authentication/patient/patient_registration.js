const bcryptjs = require('bcryptjs');
const Patient = require('../../../models/user_models/patient_model');
const Helpers = require('../../../util/helpers');

// Instance of Helpers class
const helper = new Helpers();

// PATIENT REGISTRATION
exports.registerPatient = async (req, res) => {
  helper.log(req);

  const { name, email, phoneNumber, idNumber, residence, gender, dateOfBirth, password } = req.body;

  try {
    
      if (!name || !email || !phoneNumber || !idNumber || !residence || !password || !dateOfBirth || !gender) {
          return res.status(400).json("All fields are required");
      }

      // Check if the patient is already registered
      const patient = await Patient.findOne({ where: { email: email } });


      console.log(req.body);

      if (patient) {
          console.log("User already registered");
          return res.status(409).json("User already registered in the Database");
      }

      // Generate OTP
      const otp = helper.generateOTP();

      // Hash the password
      const hashedPassword = bcryptjs.hashSync(password);

      // Expiration date (Days)
      const expirationDate = new Date();
      const validDays = 90;
      expirationDate.setDate(expirationDate.getDate() + validDays);

      

      // Save Patient details with expiration date
      const unverifiedPatient = new Patient({
          name,
          email,
          phoneNumber,
          idNumber,
          residence,
          gender,
          dateOfBirth,  
          password: hashedPassword,
          otp: otp,
          isVerified: false,
          passwordExpirationDate: expirationDate,
          role: {
              'User': 1000,
              'Patient': 2000,
          },
          permissions: {}
      });

      await unverifiedPatient.save();

      console.log('Patient registered successfully');

      // Send email
      const emailResponse = await helper.sendEmail(email, "Registration OTP", `Your registration OTP is ${otp}`);
      if (!emailResponse.success) {
          return res.json('Failed to send OTP email');
      }

      return res.json('User registered, Check your email for OTP');
  } catch (error) {
      console.error(error);
      res.status(500).json("Internal server error");
  }
};
