const express = require("express")
const users = require("../model/user_model")
const nodemailer = require("nodemailer")
const router = express.Router()
const bcrypt = require("bcryptjs")

/**
 * @swagger
 * components:
 *   schemas:
 *     user1:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: email
 *       example:
 *         email: yash.karpe@gmail.com
 *        
 *
 */

/**
 * @swagger
 * /api/v1/send-otp-to-user:
 *   post:
 *     summary: email Send for forgot password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user1'
 *     responses:
 *       200:
 *         description: verificationCode send  successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user1'
 *       500:
 *         description: Some server error
 */

// ========== DEV MODE: OTP DISPLAYED IN TERMINAL ==========
console.log("📧 DEV MODE: OTPs will be displayed in this terminal");

// Function to send OTP - logs to terminal instead of sending email
async function sendOtpemail(email, otp) {
  console.log("");
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║                    📧 OTP VERIFICATION                     ║");
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log(`║  Email: ${email.padEnd(49)}║`);
  console.log(`║  OTP Code: ${otp}                                          ║`);
  console.log("╠════════════════════════════════════════════════════════════╣");
  console.log("║  Use this OTP to verify on the frontend                    ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log("");
  return { messageId: "terminal-otp-" + Date.now(), otp: otp };
}

// Function to generate OTP and send email
async function generateAndSendOtp(email, res) {
  try {
    // Fetch user data from the database using email
    console.log("Searching for email:", email);
    const user = await users.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Update user record with OTP and expiration time
    user.OTP = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    // Log OTP to terminal
    await sendOtpemail(email, otp);

    console.log("OTP generated successfully");
    // DEV MODE: Return OTP in response so it can be shown on browser
    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      devOtp: otp  // This will be shown on browser in dev mode
    });
  } catch (error) {
    console.error("Error generating or sending OTP:", error);
    return res.status(200).json({
      success: false,
      message: "Error generating or sending OTP",
      error: error.message,
    });
  }
}

router.post('/send-otp-to-user', async (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  if (!email) {
    return res.status(200).json({ success: false, message: 'Email is required' });
  }

  try {
    // Generate and send OTP
    await generateAndSendOtp(email, res); // Pass `res` to the function

  } catch (error) {
    res.status(200).json({ success: false, error: 'Failed to send OTP' });
  }
});


/**
 * @swagger
 * components:
 *   schemas:
 *     ChangePasswordRequest:
 *       type: object
 *       required:
 *         - email
 *         - oldPassword
 *         - newPassword
 *         - retypePassword
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address
 *           example: user@gmail.com
 *         oldPassword:
 *           type: string
 *           description: User's current password
 *           example: oldpassword123
 *         newPassword:
 *           type: string
 *           description: New password for the user
 *           example: newpassword123
 *         retypePassword:
 *           type: string
 *           description: Retype new password for confirmation
 *           example: newpassword123
 * 
 * /api/v1/change-password-user:
 *   post:
 *     summary: Change password for user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *       400:
 *         description: Invalid input or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid old password
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */

router.post('/change-password-user', async (req, res) => {
  const { email, oldPassword, newPassword, retypePassword } = req.body;

  try {
    // Find the user by email
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Verify the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid old password');
    }

    // Check if newPassword and retypePassword match
    if (newPassword !== retypePassword) {
      return res.status(400).send('New password and retype password do not match');
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


/**
 * @swagger
 * components:
 *   schemas:
 *     forgotpassword:
 *       type: object
 *       required:
 *         - email
 *         - newPassword
 *         - otp
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address (e.g., user@gmail.com)
 *         newPassword:
 *           type: string
 *           description: The new password for the user
 *         otp:
 *           type: integer
 *           description: One-time password for verification
 *       example:
 *         email: user@gmail.com
 *         newPassword: user@12345
 *         otp: 987471
 */

/**
 * @swagger
 * /api/v1/user-forgot-password:
 *   post:
 *     summary: Change password for user
 *     tags: [User ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forgotpassword'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/forgotpassword'
 *       500:
 *         description: Some server error
 */
router.post('/user-forgot-password', async (req, res) => {
  try {
    const { email, OTP, newPassword } = req.body;

    console.log("Password reset request for:", email);
    console.log("Received OTP:", OTP, "Type:", typeof OTP);

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        data: null
      });
    }

    console.log("Stored OTP:", user.OTP, "Type:", typeof user.OTP);

    // Verify OTP - convert both to strings for comparison
    if (String(user.OTP) !== String(OTP)) {
      console.log("OTP mismatch!");
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
        data: null
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password and clear the OTP
    user.password = hashedPassword; // Use 'user' instead of 'users'
    user.OTP = null; // Use 'user' instead of 'users'
    await user.save(); // Call save on the user instance

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong: ${error.message}`,
      data: null
    });
  }
});


module.exports = router
