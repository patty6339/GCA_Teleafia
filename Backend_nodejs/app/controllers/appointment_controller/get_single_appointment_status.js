
const AppointmentBooking = require ('../../models/appointment_model/appointment_booking_model')
const Helpers = require('../../util/helpers');

const helper = new Helpers();

exports.appointmentStatus= async (req,res)=> {

    helper.log(req);
    
    const {appointmentId}=req.params
    try{

        const appointment=await AppointmentBooking.findOne({where:{appointmentId}})
        if(!appointment){
            return res.status(404).json({message:'appointment not found'})
        }
        return res.status(200).json(appointment)
    }catch(error){
        return res.status(500).json({message:'server error'})
    }
}