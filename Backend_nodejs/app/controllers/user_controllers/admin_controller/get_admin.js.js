const Admin = require('../../../models/user_models/user_model')

exports.getOneAdmin = async(req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByPk(id);
        if(!admin){
            return res.status(404).json({ message: 'Admin not found' });
        }
        return res.json(admin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}