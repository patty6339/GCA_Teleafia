
const Prescription = require('../../../models/prescription/prescription');

exports.getAllPrescriptionsPerPatient = async (req, res) => {

  const {id} = req.params
  try {
    const prescriptionData = await Prescription.findAll({where:{patientId: id}});

    if (!prescriptionData || prescriptionData.length === 0) {
      return res.status(404).json({ message: 'No prescriptions found' });
    }

    const prescriptions = prescriptionData.map(prescription => {
      // Assuming 'images' field contains the array of image filenames
      const imageUrls = prescription.images.map(image => `${process.env.IP_ADRESS}:5500/images/${image}`);

      return {
        prescriptionId: prescription.prescriptionId,
        images: imageUrls, // This will now be an array of URLs
        patientName: prescription.patientName,
        patientEmail: prescription.patientEmail,
        prescriptionStatus: prescription.prescriptionStatus
      };
    });

    return res.status(200).json(prescriptions);

  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
