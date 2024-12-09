
const Admin = require('../../../models/user_models/user_model');
const bcryptjs = require('bcryptjs')
const Helpers = require('../../../util/helpers');

const helper = new Helpers();

exports.adminInitialPasswordChange = async (req,res) => {

  helper.log(req);
  
  const { email, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({where: { email: email}});

    if (!admin) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const hashedPassword = bcryptjs.hashSync(newPassword);

    //Update the password
    admin.password = hashedPassword;

    admin.isInitialPasswordChanged = true;

    await admin.save();

    return res.status(200).json({ message: 'Password reset successfully' });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}