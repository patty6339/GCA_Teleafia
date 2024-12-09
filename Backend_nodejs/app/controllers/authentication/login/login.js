const Patient = require('../../../models/user_models/patient_model');
const Chp = require('../../../models/user_models/chp_model');
const Admin = require('../../../models/user_models/user_model');
const SuperAdmin = require('../../../models/user_models/user_model');
const Doctor = require('../../../models/user_models/doctor_model');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

dotenv.config();

// Define a map to track failed login attempts per user
const failedLoginAttempts = new Map();

exports.login = async (req, res) => {
  helper.log(req);

  try {
    const { email, password } = req.body;

    let user = await Chp.findOne({ where: { email } });
    let profileType = 'CHP';

    if (!user) {
      user = await Patient.findOne({ where: { email } });
      profileType = 'PATIENT';

      if (user && !user.isVerified) {
        return res.status(409).json({ error: 'Account not verified' });
      }
    }

    if (!user) {
      user = await Admin.findOne({ where: { email } });
      profileType = 'ADMIN';
    }

    if (!user) {
      user = await Doctor.findOne({ where: { email } });
      profileType = 'DOCTOR';
    }

    if (!user) {
      user = await SuperAdmin.findOne({ where: { email } });
      profileType = 'SUPERADMIN';
    }

    if (!user) {
      return res.status(404).json({ error: 'Wrong Login credentials' });
    }

    if (user.isDeleted) {
      return res.status(400).json({ error: 'Wrong Login credentials (Deleted User)' });
    }

    if (user.isPasswordBlocked) {
      return res.status(400).json({ error: 'Password Blocked. Reset your password' });
    }

    // Check if the user has exceeded the maximum number of login attempts
    const maxAttempts = 5;
    const failedAttempts = failedLoginAttempts.get(email) || 0;
    const attemptsRemaining = maxAttempts - failedAttempts;

    if (failedAttempts >= maxAttempts) {
      user.isPasswordBlocked = true;
      await user.save();

      return res.status(400).json({ error: 'Password Blocked. Reset your password' });
    }

    // Verify password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      // Increment failed login attempts
      failedLoginAttempts.set(email, failedAttempts + 1);
      return res.status(400).json({ error: `Wrong login credentials. Attempts remaining: ${attemptsRemaining}` });
    }

    // Clear failed login attempts upon successful login
    failedLoginAttempts.delete(email);

    // Check if password is expired
    if (user.isPasswordExpired) {
      return res.status(403).json({ error: 'Password expired! Please reset your password.', errorCode: 'ExpiredPassword' });
    }

    if ((profileType === 'CHP' && !user.isInitialPasswordChanged) ||
        (profileType === 'DOCTOR' && !user.isInitialPasswordChanged) ||
        (profileType === 'ADMIN' && !user.isInitialPasswordChanged)) {
      return res.status(409).json({ error: 'Initial password change is required. Please change your password before logging in.' });
    }

    // Generate Access and Refresh Tokens
    const tokenResponse = await helper.generateTokens(user);
    if (!tokenResponse.success) {
      return res.status(500).json({ error: tokenResponse.error });
    }

    const accessToken = tokenResponse.accessToken;
    const refreshToken = tokenResponse.refreshToken;

    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.setHeader('Refresh-Token', `Bearer ${refreshToken}`);

    // Combine token response and user details into a single JSON object
    const response = {
      ...tokenResponse,
      user: {
        id: user.id,
        email: user.email,
        profileType,
        idNumber: user.idNumber,
        name: user.name,
        phoneNumber: user.phoneNumber,
        avatarSrc: `${process.env.NGROK_ADDRESS}/images/${user.avatarSrc}`,
        location: user.location,
        dateOfBirth: user.dateOfBirth
      }
    };

    return res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
