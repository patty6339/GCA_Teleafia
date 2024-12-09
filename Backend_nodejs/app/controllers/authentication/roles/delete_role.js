

const Roles = require("../../../models/user_models/roles")

exports.deleteRoles = async (req,res) => {

  try {

    const {code} = req.params;
    const role = await Roles.findOne({where: {code: code}});

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    
    await role.destroy();

    res.status(200).json({message: 'Role deleted successfully'});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

}