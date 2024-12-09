

const Chp = require('../../../models/user_models/chp_model')
const bcrypt = require('bcryptjs')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();


exports.updateChpDetails = async (req, res) => {

  helper.log(req);

  const { id } = req.params
  const updatedChp = req.body

  try {

    const chp = await Chp.findOne({ where: { idNumber : id } })

    if (!chp) {
      return res.status(404).json({ message: 'User not found'});
    }

    if(updatedChp.password){

      const password = bcrypt.hashSync(updatedChp.password)

      updatedChp.password = password
    }

    const newChp = await chp.update(updatedChp)
    
    res.status(200).json({ message: 'Chp details updated successfully', newChp  })
    
  } catch (error) {

    console.log(error)
    res.status(500).json({ error: 'Server error' })    
  }

  
}