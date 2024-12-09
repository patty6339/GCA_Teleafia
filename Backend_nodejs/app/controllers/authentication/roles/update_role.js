
const Roles = require("../../../models/user_models/roles")

exports.updateRoles = async (req,res) => {

  try {

    const {code} = req.params;
    const role = await Roles.findOne({where: {code: code}});

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    
    const updatedRole = req.body
    await role.update(updatedRole);

    res.status(200).json(role);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

}