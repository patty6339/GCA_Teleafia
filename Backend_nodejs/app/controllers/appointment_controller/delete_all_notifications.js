
const Patient = require ('../../models/user_models/patient_model')
const Helpers = require('../../util/helpers');

const helper = new Helpers();
exports.deleteAllNotifications= async (req,res) => {

    helper.log(req);
    
    const {idNumber}=req.params
    try{
        const patient=await Doctor.findOne({where: {idNumber:idNumber}})

        patient.notifications=[]

        patient.unSeenNotifications=[]

        const updatedUser=await patient.save();

        updatedUser.password=undefined;

        return res.status(200).json({message:'Notifications deleted successfully',updatedUser})

    }catch(error){

        return res.status(500).json({message:'Failed to delete all notifications'})
    }
}