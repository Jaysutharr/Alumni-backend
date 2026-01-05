const User = require("../model/user_model")
const Role = require("../model/role_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config1 = require("../config/development.json"); 
const generateId = require('../middleware/setting_middleware'); 
exports.signup = async (req, res) => {
    try {
      const {email } = req.body;
      
      const existingUser = await User.findOne({ email:email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      // Check if the user role exists in the roles schema
      // const existingRole = await Role.findOne({ role: req.body.role });
      // let role;
      // if (!existingRole) {
      //   // If the role does not exist, create a new role
      //   const newRole = new Role({ role: req.body.role }); // Use req.body.role instead of req.body.jobrole
      //   const savedRole = await newRole.save();
      //   role = savedRole.role;
      // } else {
      //   role = existingRole.role;
      // }
      let userId;
      if (req.body.role === 'User') {
        userId = await generateId('user');
      }else if(req.body.role === 'Admin'){
          userId = await generateId('admin');  
      }
   
    
  
      const user = new User({
        userId: userId,
        FullName: req.body.FullName,
        email: req.body.email.toLowerCase(),
        password: bcrypt.hashSync(req.body.password, 8),
       
    
      });
  
   
  
      const savedUser = await user.save();
      res.json({success:true, message: "User  Created successfully!", data: savedUser });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    let users = await User.aggregate([
      { $match: { email: email } }
    ]);

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid Credentials", data: null });
    }

    let user = users[0];

    if (user.Status !== 'Active') {
      return res.status(200).json({ success: false, message: "User account is not active", data: null });
    }

    if (!user.password) {
      return res.status(500).json({ success: false, message: "User password not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid Email or Password", data: null });
    }

    let userDetails = {
      userId: user.userId,
      email: user.email,
      FullName: user.FullName,
      StreetAddress: user.StreetAddress,
      City: user.City,
      State: user.State,
      Country: user.Country,
      Postalcode: user.Postalcode,
      Status: user.Status,
      connections: user.connections,
      connectionRequests: user.connectionRequests,
    };

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      config1.local.accessTokenJwtSecret,
      { expiresIn: config1.local.accessTokenJwtExpiry }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      config1.local.refreshTokenJwtSecret,
      { expiresIn: config1.local.refreshTokenJwtExpiry }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      userDetails: userDetails,
      accessToken: accessToken,
      refreshToken: refreshToken
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error: " + error.message });
  }
};

  exports.getalluser = async (req, res) => {
    try {
        // Fetch all users from the database
        const result = await User.find();

        // Respond with the list of users
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully.',
            data: result, // Include the retrieved user data
        });
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error(error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: 'Error retrieving users.',
            error: error.message, // Send the error message back
        });
    }
};
