const { DataTypes } = require('sequelize');
const sequelize = require('../../db/chp_management');
const Household = require('../../models/chp_models/household_model')


const PregnancyAssessment = sequelize.define('pregnancy_assessment', {
  householdNumber:{
    type: DataTypes.STRING,
    allowNull: false,
   },
    isPregnant: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hasMCHHandbook: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hasIntegratedBirthPlan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    consentForReferral: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    medicationsOrSupplements: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    anyComplicationsDuringPreviousPregnancies: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isAwareOfPrenatalVitaminsAndNutrition: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    receivedHPVVaccine: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    needExplanationForHPVVaccine: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    experiencesMenstrualIrregularitiesOrDifficulties: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isSexuallyActive: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    usingAnyFormOfContraception: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

PregnancyAssessment.belongsTo(Household, { foreignKey: 'householdNumber', targetKey: 'householdNumber' });

module.exports = PregnancyAssessment;
