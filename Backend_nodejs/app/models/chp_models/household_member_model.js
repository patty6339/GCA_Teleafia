const { DataTypes } = require('sequelize');
const sequelize = require('../../db/chp_management');
const Household = require('./household_model'); 

const HouseholdMember=sequelize.define('HouseholdMember',{

    //MEMBER DETAILS & HEALTHCARE PROFILE
    householdNumber:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    age:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false 
    },
    ethnicityRace: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    highestEducationalLevel:{
        type: DataTypes.STRING,
        allowNull: false 
    },
    employed:{
        type: DataTypes.STRING,
        allowNull: false 
    },
    medicalInsurance:{
        type: DataTypes.STRING,
        allowNull: false 
    },

    //HEALTH QUALITY
    satisfactionWithPrimaryHealthcare:{
        type: DataTypes.STRING,
        allowNull: false 
    },
    issuesWithQualityOfHealthcare:{
        type:DataTypes.TEXT,
        allowNull: true
    },

    //HEALTH ACCESS
    rateAccessibilityOfPrimaryHealthcare:{
        type: DataTypes.STRING,
        allowNull: false
    },
    barriersInAccecibilityInThePastYear:{
        type: DataTypes.STRING,
        allowNull: false
    },
    specifyTheBarrier:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    distanceToNearestHealthcareFacility:{
        type: DataTypes.STRING,
        allowNull: false
    },
    healthcareServicesNotOffered:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    recommendedHealthcarePrograms:{
        type:DataTypes.TEXT,
        allowNull: false
    }
});

// Define the association with Household model
HouseholdMember.belongsTo(Household, { foreignKey: 'householdNumber', targetKey: 'householdNumber' });


module.exports = HouseholdMember;

