
const Chp = require('../../../models/user_models/chp_model');
const bcryptjs = require('bcryptjs')
const Helpers=require('../../../util/helpers')

const helper= new Helpers();

exports.chpInitialPasswordChange = async (req,res) => {

  helper.log(req);
  
  const { email, newPassword } = req.body;

  try {
    const chp = await Chp.findOne({where: { email: email}});

    if (!chp) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const hashedPassword = bcryptjs.hashSync(newPassword);

    //Update the password
    chp.password = hashedPassword;
    chp.isInitialPasswordChanged = true;

    await chp.save();

    return res.status(200).json({ message: 'Password reset successfully' });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}