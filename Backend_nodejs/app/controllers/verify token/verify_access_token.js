const jwt = require('jsonwebtoken');

// Verifying JWT token
exports.verifyAccessToken = (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization;

  //The header must be present and starts with 'Bearer '
  if (authHeader?.startsWith('Bearer ')) {

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {

      if (err) {
        return res.status(401).json( 'Invalid Access Token' );
      }

      const { name, email, role, profileType } = user.userInfo; 
      req.user = { name, email, role, profileType }; 
      req.roles = user.userInfo.role;

      next();
    });

  } else {

    return res.status(401).json('You are not authenticated');

  }
};
