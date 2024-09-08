const jwt = require("jsonwebtoken");
require("dotenv").config();
const BlacklistedToken = require('../models/blacklistedToken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token is require' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

module.exports = ensureAuthenticated;

exports.isCustomer = (req, res, next) => {
    try {
        if (req.user.role !== "Customer") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for cutomer you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}

exports.isOwner = (req, res, next) => {
    try {
        if (req.user.role !== "Owner") {
            return res.status(401).json({
                success: false,
                message: "This is a protect route for owner,you can not access it"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        // Check if token is blacklisted
        const blacklistedToken = await BlacklistedToken.findOne({ token });
        if (blacklistedToken) {
          return res.status(401).json({ message: 'Token is invalid' });
        }
        
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        
        next();
      } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
  
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
  
