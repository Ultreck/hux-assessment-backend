
let tokenBlacklist = [];

// function handling/checking wether token blacklist array contains user token or not
const checkBlacklist = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (tokenBlacklist.includes(token)) {
      return res.status(401).json({ msg: 'Token is blacklisted' });
    }
    next();
  };

// function handling user logout
const blacklistJwtToken = (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
  
    tokenBlacklist.push(token);
  
    res.status(200).json({ msg: 'Logged out successfully' });
  };


  module.exports = {blacklistJwtToken, checkBlacklist};