const { DataTypes } = require('sequelize');
const sequelize = require('../../db/user_management'); 

const Patient = sequelize.define('patients', {
  name: {
    type: DataTypes.STRING,  
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email address already in use'
    },
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  residence: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordExpirationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  passOtp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expiredPassOtp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profileType: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: "PATIENT"
  },
  role: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: 'User'
  },
  permissions: {
    type: DataTypes.JSON,
    allowNull: true
  },
  avatarSrc: {
    type: DataTypes.STRING, 
    allowNull: true 
  },
  backgroundImage: {
    type: DataTypes.STRING, 
    allowNull: true 
  },
  notifications: {
    type: DataTypes.JSON, 
    allowNull: true,
    defaultValue: [] 
  },
  seenNotifications: {
    type: DataTypes.JSON, 
    allowNull: true,
    defaultValue: [] 
  }
}, {
  hooks: {
    beforeSave: (patient) => {
      if (patient.dateOfBirth) {
        const ageDifMs = Date.now() - new Date(patient.dateOfBirth).getTime();
        const ageDate = new Date(ageDifMs);
        patient.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    }
  }
});

module.exports = Patient;
