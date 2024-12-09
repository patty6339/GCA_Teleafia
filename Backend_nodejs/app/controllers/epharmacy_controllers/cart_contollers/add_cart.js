const Cart = require('../../../models/epharmacy_models/cart_model/cart_model');
const Patient = require('../../../models/user_models/patient_model');
const Helper = require('../../../util/helpers')

const helper = new Helper();


//CREATE CART
exports.createNewCart = async (req, res) =>{

  helper.log(req);

  const { idNumber }  = req.params
  const {products} = req.body

  try {

    const patient = await Patient.findOne({ where : { idNumber : idNumber }})

    if (!patient) {
      return res.status(404).json({ message: 'User not found'});
    }

    const newCart =  new Cart({
      userName : patient.name,
      userId : patient.idNumber,
      products,
    })

    await newCart.save();
    res.status(201).json({newCart});

  } catch (error) {

    console.log(error);
    res.status(500).json({ error: 'Internal server error' });

  }

};