const { Router } = require('express'); // Import Router from Express
// const  verifySignUp  = require("../muserIddleware/verifySignUp");
const controller = require("../controller/userlogin_controller");
const User = require("../model/user_model")
const router = Router(); // Create a new router instance

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - userId
 *         - FullName
 *         - email
 *         - password
 *       properties:
 *         userId:
 *           type: integer
 *           description: Unique userIdentifier for the user.
 *         FullName:
 *           type: string
 *           description: Full FullName of the user.
 *         email:
 *           type: string
 *           description: Email of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *       example:
 *         userId: 1
 *         FullName: "kalyani Karpe"
 *         email: "kalyani.karpe@gmail.com"
 *         password: "1234"
 *         role: "User"
 */


/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: add a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         FullName: create user successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         FullName: Some server error
 */
router.post(
    "/auth/signup",
    controller.signup
);

/**
* @swagger
* components:
*   schemas:
*     user1:
*       type: object
*       required:
*         - email
*         - password
*       properties:
*         email:
*           type: string
*           description: "yash.karpe@example.com"
*         password:
*           type: string
*           description: password
*       example:
*         email: "yash.karpe@example.com"
*         password: "1234"
*        
*
*/


/**
* @swagger
* /api/v1/auth/signin:
*   post:
*     summary: user login
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/user1'
*     responses:
*       200:
*         description: user login successfull
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/user1'
*       500:
*         description: Some server error
*/
router.post("/auth/signin", controller.signin);









const nodemailer = require('nodemailer');
// Adjust the path as necessary
const crypto = require('crypto');



// Connect to MongoDB


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.PASSWORD, // Your email password or app password
    },
});

// Endpoint to send OTP
/**
 * @swagger
 * /api/v1/send-otp:
 *   post:
 *     summary: Send OTP to email
 *     tags: [User]
 *     description: Generates and sends a One-Time Password (OTP) to the specified email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *       400:
 *         description: User not found or invaluserId email.
 *       500:
 *         description: Error sending OTP.
 */

/**
 * @swagger
 * /api/v1/verify-email:
 *   post:
 *     summary: Verify email using OTP
 *     tags: [User]
 *     description: Verifies the provuserIded OTP for the specified email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       400:
 *         description: InvaluserId OTP or user not found.
 *       500:
 *         description: Error verifying OTP.
 */

// Send OTP endpoint
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const otpExpires = Date.now() + 300000; // OTP valuserId for 5 minutes

    try {
        let user = await User.findOne({ email });

        if (user) {
            // Update existing user
            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();
        } else {
            // Create new user
            user = new User({ email, otp, otpExpires });
            await user.save();
        }

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valuserId for 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP.', error: error.message });
    }
});

// Verify email endpoint
router.post('/verify-email', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare OTP as strings to avoid type mismatch
        if (!user.OTP || String(user.OTP) !== String(otp)) {
            return res.status(401).json({ message: 'Invalid OTP.' });
        }

        if (user.otpExpires && user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP expired.' });
        }

        // Mark user as verified (but DON'T clear OTP - needed for forgot password)
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP.', error: error.message });
    }
});

// Start the server
;


/**
 * @swagger
 * /api/v1/getalluser:
 *   get:
 *     summary: Retrieve all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _userId:
 *                         type: string
 *                         example: "60c72b2f9b1e8b001f8e4f39"
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       isVerified:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-08-15T10:30:00Z"
 *       500:
 *         description: Error retrieving users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error retrieving users.
 *                 error:
 *                   type: string
 *                   example: Some error message
 */
router.get('/getalluser', controller.getalluser);


/**
 * @swagger
 * /api/v1/updateuser/{userId}:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The unique identifier of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *               name:
 *                 type: string
 *                 example: "New Name"
 *             required:
 *               - email
 *               - name
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "60c72b2f9b1e8b001f8e4f39"
 *                     email:
 *                       type: string
 *                       example: "newemail@example.com"
 *                     name:
 *                       type: string
 *                       example: "New Name"
 *       400:
 *         description: Invalid userId or update details provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid userId or update details provided."
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       500:
 *         description: Internal server error while updating user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error while updating user."
 */


router.put('/updateuser/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Validate userId
        if (!userId) {
            return res.status(200).json({
                success: false,
                message: 'Invalid userId provided.',
            });
        }

        // Find user by userId (string) and update
        const user = await User.findOneAndUpdate(
            { userId: userId }, // Filter object where userId is a string
            req.body,           // Update details
            { new: true, runValidators: true } // Options
        );

        if (!user) {
            return res.status(200).json({
                success: false,
                message: 'User not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully.',
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(200).json({
            success: false,
            message: 'Error updating user.',
            error: error.message,
        });
    }
});


// Assuming you saved the User model in models/User.js



/**
 * @swagger
 * /api/v1/getsingleuser/{userId}:
 *   get:
 *     summary: Get user by userId
 *     tags: [User]
 *     description: Retrieve user details by userId.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The userId of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user
 */
router.get('/getsingleuser/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
});






// Assuming the User model is in models/User.js

/**
 * @swagger
 * /api/v1/getuserbyrole/role:
 *   get:
 *     summary: Get users by role
 *     description: Retrieve a list of users based on their role
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: role
 *         required: true
 *         description: The role of the users to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid role provided
 *       500:
 *         description: Server error
 */
router.get('/getuserbyrole/role', async (req, res) => {
    const { role } = req.query;

    if (!role) {
        return res.status(400).json({ message: 'Role is required' });
    }

    try {
        const users = await User.find({ role });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
});


/**
 * @swagger
 * /api/v1/getprofilenetworkapi/{userId}:
 *   get:
 *     summary: Retrieve user profiles with academic and general profile details by userId
 *     tags: [User]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve profiles for
 *         schema:
 *           type: string
 *           example: "U67890"
 *     responses:
 *       200:
 *         description: Successfully retrieved user profiles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User profile retrieved successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f9b1e8b001f8e4f39"
 *                       studentId:
 *                         type: string
 *                         example: "S12345"
 *                       userId:
 *                         type: string
 *                         example: "U67890"
 *                       AcademicProfiles:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "60c72b2f9b1e8b001f8e4f40"
 *                             userId:
 *                               type: string
 *                               example: "U67890"
 *                             academicLevel:
 *                               type: string
 *                               example: "Bachelor's Degree"
 *                             major:
 *                               type: string
 *                               example: "Computer Science"
 *                       Profile:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "60c72b2f9b1e8b001f8e4f41"
 *                             userId:
 *                               type: string
 *                               example: "U67890"
 *                             firstName:
 *                               type: string
 *                               example: "John"
 *                             lastName:
 *                               type: string
 *                               example: "Doe"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve profiles.
 */



router.get('/getprofilenetworkapi/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await User.aggregate([
            {
                $match: {
                    userId: userId // Match the specific userId
                }
            },
            {
                $lookup: {
                    from: 'academicprofiles',
                    localField: 'studentId',
                    foreignField: 'userId',
                    as: "AcademicProfiles"
                }
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: "Profile"
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve profiles",
        });
    }
});


module.exports = router; // Export the router
