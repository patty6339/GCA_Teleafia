const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');
const os = require('os');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

dotenv.config();

class Helpers {

  constructor() {
    this.zoomToken = process.env.token;
  }

  // Generate OTP
  generateOTP() {
    return otpGenerator.generate(4, {
      digits: true,
      alphabets: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      uppercase: false,
      specialChars: false
    });
  }

  // Generate Transaction ID
  generateTransactionId() {
    return otpGenerator.generate(8, {
      digits: true,
      alphabets: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: true,
      uppercase: true,
      specialChars: false
    });
  }

  // Send Email
  async sendEmail(email, subject, message) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: subject,
      text: `${message}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: 'Failed to send OTP email' };
    }
  }

  // Log Requests
  async log(req, res) {
    try {
      const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
      const logFileName = `${currentDate}-request.log`;
      const logFilePath = path.join(__dirname, `../util/log/${logFileName}`);
      const hostName = os.hostname();
      const logString = `[${DateTime.local().toFormat('yyyy-MM-dd hh.mm.ss a')}] => method: ${req.method} uri: ${req.path} queryString: ${encodeURIComponent(req.url)} protocol: ${req.protocol} remoteAddr: ${req.ip} remotePort: ${req.connection.remotePort} userAgent: ${req.headers['user-agent']} hostname:${hostName}`;

      await fs.promises.mkdir(path.dirname(logFilePath), { recursive: true });

      const mode = await fs.promises.access(logFilePath, fs.constants.F_OK)
        .then(() => 'a')
        .catch(() => 'w');

      await fs.promises.writeFile(logFilePath, logString + '\n', { flag: mode });

      return logString;
    } catch (error) {
      console.error(error);
    }
  }

  // Get Logs for a Specific Date
  async getLogsForDate(date) {
    try {
      const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
      const logFileName = `${currentDate}-request.log`;
      const logFilePath = path.join(__dirname, `../util/log/${logFileName}`);
      const logContent = await fs.promises.readFile(logFilePath, 'utf-8');
      const logLines = logContent.split('\n');
      const logsForDate = logLines.filter(logLine => logLine.includes(date));
      return logsForDate.join('\n');
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving logs for the specified date');
    }
  }

  // Get Logs for Login
  async getLogsForLogin(date) {
    try {
      const currentDate = DateTime.local().toFormat('yyyy-MM-dd');
      const logFileName = `${currentDate}-request.log`;
      const logFilePath = path.join(__dirname, `../util/log/${logFileName}`);
      const logContent = await fs.promises.readFile(logFilePath, 'utf-8');
      const logLines = logContent.split('\n');
      const logsForLogin = logLines.filter(logLine => {
        return logLine.includes(date) && logLine.includes('method: POST') && logLine.includes('uri: /login');
      });
      return logsForLogin.join('\n');
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving login logs');
    }
  }

  // Generate Tokens
  async generateTokens(user) {
    try {
      const role = Object.values(user.role);
      const profileType = user.profileType;

      const accessToken = jwt.sign(
        {
          "userInfo": {
            "name": user.name,
            "email": user.email,
            "role": role,
            "profileType": profileType
          }
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '900s' }
      );

      const refreshToken = jwt.sign(
        {
          "userInfo": {
            "name": user.name,
            "email": user.email,
            "profileType": profileType
          }
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '1d' }
      );

      return { success: true, message: user.name + ' (' + user.profileType + ') ' + ' Logged in Successful', accessToken, refreshToken, user };
    } catch (error) {
      console.log(error);
    }
  }

  // Generate UUID
  async generateUUID(length = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uuid = '';
    for (let i = 0; i < length; i++) {
        uuid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uuid;
  }

  // Get Zoom Access Token
  async getZoomAccessToken(code) {
    try {
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REDIRECT_URI
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting Zoom access token:', error.response ? error.response.data : error.message);
        throw error;
    }
  }

  // Create Zoom Meeting
  async createMeeting(topic, type, start_time, duration, timezone) {
    try {
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic,
            type,
            start_time,
            duration,
            timezone,
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: true,
                waiting_room: true
            }
        }, {
            headers: {
                Authorization: `Bearer ${this.zoomToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        console.error('Error creating meeting:', err.response ? err.response.data : err.message);
    }
  }

  // Fetch Profile Image URL
  async getProfileImage(id, model) {
    try {
      const user = await model.findOne({ where: { idNumber: id } });
      if (!user) {
        return { status: 404, message: `${model.name} not found` };
      }

      const avatarSrcImageUrl = `${process.env.NGROK_ADRESS}/images/${user.avatarSrc}`;
      if (!avatarSrcImageUrl) {
        return { status: 400, message: 'Profile image not found' };
      }

      return { status: 200, avatarSrcImageUrl };
    } catch (error) {
      console.error('Error fetching profile image:', error);
      return { status: 500, message: 'Internal server error' };
    }
  }

    async generateUniqueIdentifier(prefix) {
      const randomNumber = Math.floor(Math.random() * 100000); 
      const uniqueIdentifier = `${prefix}${randomNumber.toString().padStart(5, '0')}`; 
  
      return uniqueIdentifier;
    }
  
}

module.exports = Helpers;
