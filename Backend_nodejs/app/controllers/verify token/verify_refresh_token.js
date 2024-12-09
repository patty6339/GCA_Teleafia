const jwt = require('jsonwebtoken');
const BlacklistedToken  = require('../../models/user_models/blacklisted_tokens');

exports.verifyRefreshToken = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    // Check if token is blacklisted
    const blacklistedToken = await BlacklistedToken.findOne({ where: { token : token } });
    if (blacklistedToken) {
      return res.status(401).json({ message: 'Token Expired, Kindly Log in' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid Refresh Token' });
      }

      req.user = user;

      next();
    });

  } else {
    return res.status(401).json({ message: 'You are not authenticated' });
  }
};
