const Admin = require('../../../models/user_models/user_model')

exports.updateAdmin = async(req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByPk(id);
        if(!admin){
            return res.status(404).json({ message: 'Admin not found' });
        }
        
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;
        admin.phoneNumber = req.body.phoneNumber || admin.phoneNumber;
        admin.idNumber = req.body.idNumber || admin.idNumber;
        admin.password = req.body.password || admin.password;
        await admin.save();
        
        return res.json({ message: 'Admin updated successfully', updatedAdmin: admin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}



