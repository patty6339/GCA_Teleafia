const{DataTypes}=require('sequelize')
const sequelize = require('../../db/chp_management');

const Household = sequelize.define('household',{
    //household registration
    householdNumber: {
        type: DataTypes.STRING,
        primaryKey: true, // Assuming this is the primary key
        allowNull: false, // Assuming it shouldn't be null
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    county: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subCounty: {
        type: DataTypes.STRING,
        primaryKey: true, // Assuming this is part of the primary key
        allowNull: false,
    },
    constituency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ward: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    communityUnit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    householdSize: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberOfUnderFive: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    

    // Socio-economic status
    householdIncomeLevel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    householdAnnualIncome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    householdPrimarySourceOfIncome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeOfResidence: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeOfResidenceOwnership: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    householdAmmenities: {
        type: DataTypes.JSON, 
        allowNull: false,
        defaultValue: [], 
    },
   
    //Water and Sanitization Hygiene
    sourceOfDrinkingWater: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:'[]'
    },
    reliabilityOfWaterSupply: {
        type: DataTypes.STRING,
        allowNull: false
    },
    treatingConsumptionWater: {
        type: DataTypes.STRING,
        allowNull: false
    },
    waterTreatmentMethods: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeOfSanitationFacility: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shareOfSanitationFacility: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cleaningFrequencyOfSanitationFacility: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accessibilityOfHandwashingFacility: {
        type: DataTypes.STRING,
        allowNull: true
    },
    householdMembersHandwashingFrequency: {
        type: DataTypes.STRING,
        allowNull: true
    },

    

    //Household Illness
    householdMembersWithIllnessSymptoms: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: []
    },
    illnessTypesOfHouseholdMembers: {
        type: DataTypes.JSON, 
        allowNull: true,
        defaultValue: [],      

    },
    householdMembersTreatmentRequirement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    typeOfTreatmentSought: {
        type: DataTypes.JSON, 
        allowNull: true,
        defaultValue: [], 
      },
    householdMemberCurrentlySick: {
        type:DataTypes.STRING,
        allowNull: false
    },
    soughtMedicalAttention: {
        type:DataTypes.STRING,
        allowNull: false  
    },
    memberMedicalFacilityReferralConsent: {
        type:DataTypes.STRING,
        allowNull: false
    },

   /*  
    householdIllnessPreventiveMeasures: {
        type:DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    barriersToAccessingHealthcareServices: {
        type:DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },

   

     //behaviour and lifestyle
     frequencyOfPreventiveHealthCareActivities:{
        type:DataTypes.STRING,
        allowNull:false
    },

    factorsHinderingPreventiveHealthCareActivities:{
        type:DataTypes.STRING,
        allowNull:false
    
    },
    regularPhysicalActivityEngagement:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fruitsAndVegetablesConsumptionsPerDay:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tobaccoAndNicotineUsage:{
        type:DataTypes.STRING,
        allowNull:false
    },
    alcoholConsumptions:{
        type:DataTypes.STRING,
        allowNull:false
    },
    //immunization and preventive screenings
    routineImmunizationsUpToDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastMedicalCheckupHistory:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cancerScreenings: {
        type:DataTypes.STRING,
        allowNull:false
    },
    //health information and awareness
    healthInformationAndAwareness:{
    
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'[]'
    },
    receivedEducationOrCounselingHealthMeasures : {
        type:DataTypes.STRING,
        allowNull:false
    }

    */

})

module.exports = Household;