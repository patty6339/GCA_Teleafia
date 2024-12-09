const Doctor= require('../../../models/user_models/doctor_model')
const Helper= require ('../../../util/helpers')

const helper =new Helper();

exports.doctorResendOtp= async(req,res)=>{

    helper.log(req);
    
    const {email}=req.body
    try{
        const doctor=await Doctor.findOne({where: {email: email}})
        if(!doctor){
            return res.status(400).json({message:'User not found'})
        }
        const OTP= helper.generateOTP();

        doctor.passOtp=OTP

        await doctor.save()

        const mailOptions= await helper.sendEmail(email, 'Your reset password OTP is ${OTP} click the link to reset your password http://localhost:5500/api/resetpassword')

        if(!mailOptions.success){
            return res.status(400).json({message: 'failed to send email'})
        }
        return res.status(200).json({message: 'OTP sent successfully'})
    }catch(error){
        return res.status(500).json({message:"Internal Server Error"})
    }
}