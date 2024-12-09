
const Patient= require ('../../models/user_models/patient_model')
const Helpers = require('../../util/helpers');

const helper = new Helpers();

exports.getNotifications=async (req,res)=>{

    helper.log(req);
    
    const{idNumber} = req.params
    
    try{
        const patient= await Patient.findOne({where:{idNumber:idNumber}})

        if(!patient) {

            return res.status(404).json({message:'patient not found'})
        }
        
        let notifications=patient.notifications

        if(typeof notifications==='string'){

            notifications=JSON.parse(notifications)
        }
        
        res.status(200).json({notifications})
    }catch(error){
        console.error(error);
        return res.status(500).json({message:'server error'})
    }
    
}