
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/chp_management')
const Household = require('../../models/chp_models/household_model')


const ChildHealthAssessment = sequelize.define('child_health_assessment', {
  householdNumber:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  immunizationStatusUpToDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  muacScore: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  consentForReferral: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  illnessesExperiencedRecently: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feedingMethod: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  allergiesOrIntolerances: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ChildHealthAssessment.belongsTo(Household, { foreignKey: 'householdNumber', targetKey: 'householdNumber' });

module.exports = ChildHealthAssessment;


