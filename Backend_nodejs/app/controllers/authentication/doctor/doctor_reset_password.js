
const Doctor= require('../../../models/user_models/doctor_model')
const bcryptjs=require('bcryptjs')
const Helpers=require('../../../util/helpers')

const helper= new Helpers();

exports.doctorResetPassword= async (req,res)=>{

    helper.log(req);

    const {resetCode,password}=req.body
    try{
        const doctor=await Doctor.findOne({where:{passOtp:resetCode}})

        if(!doctor){
            return res.status(400).json({message:'User not found'})
        }

        const hashedPassword= await bcryptjs.hashSync(password)

        doctor.password=hashedPassword

        await doctor.save()

        return res.status(200).json({message:'Password reset successfully'})


    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
}