
// const Doctor= require ('../../models/user_models/doctor_model')
// const Helpers = require('../../util/helpers');

// const helper = new Helpers();

// exports.unApprovedBookings=async (req,res)=>{

//     helper.log(req);

//     const{doctorId} = req.params
    
//     try{
//         const doctor= await Doctor.findOne({where:{doctorId:doctorId}})

//         if(!doctor) {

//             return res.status(404).json({message:'doctor not found'})
//         }
        
//         let unApprovedBookings=doctor.unApprovedBookings
//         if(typeof unApprovedBookings==='string'){
//             unApprovedBookings=JSON.parse(unApprovedBookings)
//         }
        
//         res.status(200).json({unApprovedBookings})

//     }catch(error){
        
//         console.log(error)
//         return res.status(500).json({message:'server error'})
//     }
    
// }



const AppointmentBooking = require('../../models/appointment_model/appointment_booking_model')

exports.unApprovedBookings = async (req, res) => {
    try {
        const pendingAppointments = await AppointmentBooking.findAll({
            where: {
                appointmentStatus: 'pending'
            }
        });

        if (pendingAppointments.length === 0) {
            return res.status(404).json({ message: 'No pending appointments found' });
        }

        res.status(200).json({pendingAppointments})
    } catch (error) {
        console.error('Error retrieving approved appointments:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
