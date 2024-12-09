

const Prescription = require('../../../models/prescription/prescription');
const Helper = require('../../../util/helpers')
const Notification = require('../../../models/notification_model/notification_model')
const Patient = require('../../../models/user_models/patient_model')


const helper = new Helper();

exports.declinePrescription = async (req, res) =>{

  try {
    
    const {prescriptionId} = req.params;
    const prescription = await Prescription.findOne({ where: { prescriptionId: prescriptionId }});

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    if (prescription.prescriptionStatus == 'Declined') {

      return res.status(409).json({ message: 'Prescription already declined' }); 

    }

    prescription.prescriptionStatus = 'Declined';

    const emailResponse = await helper.sendEmail(prescription.patientEmail,"Prescription Declined", `Prescription with id : ${prescriptionId} has been declined. Kindly consult with Pharmacy for further information`);

    const notification =  await Notification.create(
      {
        userId: prescription.patientId,
        message: `Prescription with id : ${prescriptionId} has been declined. Kindly consult with Pharmacy for further information`
      }
    )
    
    const patient = Patient.findOne({where: {idNumber:prescription.patientId}})

    patient.notification = notification;

    if (!emailResponse.success) {
       res.status(500).json({ error: 'Failed to send prescription approval email' });
    }

    await prescription.save();

    return res.status(200).json({ message: 'Prescription Declined' });

  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
}