
const jwt = require('jsonwebtoken')

exports.generateNewAccessToken = (req, res, next) => {
  
  const { name, email, profileType } = req.user;

  const accessToken = jwt.sign(
    {
      userInfo: { name, email, profileType }
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '900s' }
  );
  
  // Attach the new access token to the response headers
  res.setHeader('Authorization', `Bearer ${accessToken}`);

  res.send(`Access Token : ${accessToken}`);

  next();

};




