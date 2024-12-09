const Admin = require('../../../models/user_models/user_model')

exports.deleteOneAdmin = async(req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByPk(id);
        if(!admin){
            return res.status(404).json({ message: 'Admin not found' });
        }
        await admin.destroy();
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}