
const Delivery = require('../../../models/epharmacy_models/delivery_model/delivery_information')
const Patient = require('../../../models/user_models/patient_model')

exports.addDeliveryInformation = async (req, res) =>{

  const {userId} = req.params

  const {county, subCounty, ward, streetName, houseName, contactNumber} = req.body

  try {

    const user = await Patient.findOne({where: {idNumber : userId}})

    console.log(user)

    if(!user) {
      return res.status(404).json({message: 'User not found'})
    } 

    const deliveryInfo = new Delivery({
      county,
      subCounty,
      ward,
      streetName,
      houseName,
      contactNumber,
      userId :user.idNumber,
    })

    await deliveryInfo.save();

    return res.status(201).json({deliveryInfo})
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: 'Internal Server Error'})
  }
}