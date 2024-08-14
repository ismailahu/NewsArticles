const jwt = require('jsonwebtoken');

const AuthenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    next();
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  jwt.verify(token, jwtSecret, async (err, decodedToken) => {
    if (err) {
      next();
      return;
    }

    try {
      req.UserName = decodedToken.UserName;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = AuthenticateToken;