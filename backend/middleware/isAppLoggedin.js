const Person = require('../models/Person');
const jwt = require('jsonwebtoken');

const isAppLoggedIn = async (req, res, next) => {
  try {
    let token;

    // ✅ Prefer token from Authorization header (for React Native)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 🧁 Fallback to cookies (for web)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ msg: 'Not logged in!! ❌' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: 'Invalid token ❌' });
      }

      const user = await Person.findOne({ email: decoded.email });
      if (!user) {
        return res.status(401).json({ msg: 'User not found ❌' });
      }

      req.person = user;
      next();
    });
  } catch (error) {
    console.error('Error in isLoggedIn middleware ❌:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.isAppLoggedIn = isAppLoggedIn;
