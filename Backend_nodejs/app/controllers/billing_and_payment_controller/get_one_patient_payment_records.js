const Patient = require('../../models/user_models/patient_model');
const Payment = require('../../models/payment_and_billing/payment_model');

exports.getOnePatientPaymentsRecords = async (req, res) => {
  try {
    const { idNumber } = req.params;

    console.log(`Searching for patient with idNumber: ${idNumber}`);

    const patient = await Patient.findOne({ where: { idNumber: idNumber } });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    console.log(`Found patient: ${patient.idNumber}`);

    const payments = await Payment.findAll({ where: { customerId: patient.idNumber } });

    console.log(`Payments found: ${payments.length}`);

    res.status(200).json(payments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
