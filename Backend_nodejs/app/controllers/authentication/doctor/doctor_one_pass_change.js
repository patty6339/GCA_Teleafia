
const Doctor= require ('../../../models/user_models/doctor_model')
const bcryptjs= require('bcryptjs')
const Helpers=require('../../../util/helpers')

const helper= new Helpers();

exports.doctorInitiallPasswordChange= async(req,res)=>{

    helper.log(req);

    const {email,newPassword} = req.body
    try{
        const doctor= await Doctor.findOne({where:{email:email}})

        if(!doctor){
            return res.status(404).json({message:'user not found'})
        }
        const hashedPassword= await bcryptjs.hashSync(newPassword)

        doctor.password=hashedPassword

        doctor.isInitialPasswordChanged = true;

        await doctor.save()

        return res.status(200).json({message:'password changed successfully'})
        
    }catch(error){
        return res.status(500).json({message:'internal server error'})
    }
}