
exports.verifyRoles = (...allowedRoles) => {
  return async (req, res, next) => {

    if (!req?.roles) {
      return res.status(401).json('Unauthorized')
    }

    const rolesArray = [...allowedRoles];
    console.log("Allowed roles: " + [rolesArray]);
    console.log("User roles: " + [req.roles]);
    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

    if(!result){
      return res.status(401).json('You are not authorized to perform this action!!')
    }

    next();

  };
};


