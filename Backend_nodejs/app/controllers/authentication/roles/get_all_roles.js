
const Roles = require("../../../models/user_models/roles")

exports.getAllRoles = async (req,res) => {

  try {
    const roles = await Roles.findAll();

    if (!roles) {
      return res.status(404).json({ message: 'No roles found' });
    }

    res.status(200).json(roles);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

}