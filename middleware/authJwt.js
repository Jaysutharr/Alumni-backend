const jwt = require("jsonwebtoken");
const config = require("../config/development.json");
const User = require("../model/user_model")
 verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  const publicRoutes = ['/api/v1/signup', '/api/v1/signin']; // Add your public routes here

  if (publicRoutes.includes(req.path)) {
    return next();
  }
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.local.accessTokenJwtSecret, (err, decoded) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Your access token has expired!' });
        }
        return res.status(401).json({ message: 'Unauthorized!' });
    }
    
   
    User.findById(decoded.id)
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            // Attach user object to request for further processing
            req.user = user;
            console.log( req.user);
            next(); // Continue with next middleware or route handler
        })
        .catch(err => {
            console.error('Error finding user:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
});
};
 verifyAdminToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  const publicRoutes = ['/api/v1/admin/signup', '/api/v1/admin/signin']; // Add your public routes for admins here

  if (publicRoutes.includes(req.path)) {
    return next();
  }
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.local.accessTokenJwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    
    // Find admin in MongoDB based on decoded id
    Admin.findById(decoded.id)
      .then(admin => {
        if (!admin) {
          return res.status(401).json({ message: 'Admin not found' });
        }
        // Attach admin object to request for further processing
        req.admin = admin;
        console.log(req.admin);
        next(); // Continue with next middleware or route handler
      })
      .catch(err => {
        console.error('Error finding admin:', err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
};




const authJwt = {
  verifyToken,
  verifyAdminToken,
  // isModerator
};
module.exports = authJwt;