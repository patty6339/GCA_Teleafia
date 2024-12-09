const Admin = require('../../../models/user_models/user_model')

exports.getAllAdmins = async(req, res) => {
   
    try {
        const admins = await Admin.findAll();
        if(admins.length === 0) {
            return res.status(404).json({ message: 'No admins found'});
        }
        return res.json(admins);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}