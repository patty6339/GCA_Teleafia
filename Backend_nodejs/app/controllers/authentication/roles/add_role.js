
const Roles = require("../../../models/user_models/roles")


exports.addRole = async (req, res) => {
  try {

    const{name, code} = req.body;
      
    const role = await Roles.findOne({where: {name: name, code: code}})
    if (role) {
      return res.status(400).json({ message: "Role already exists." });
    }
    const newRole = new Roles({
      name,
      code,
      createdAt: new Date(),
      updatedAt: new Date()
  });

    await newRole.save();
    console.log(newRole)
    res.status(201).json({ message: "Role added successfully." });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}