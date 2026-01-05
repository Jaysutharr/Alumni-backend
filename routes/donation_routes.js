const express = require('express');
const router = express.Router();
const { createDonationDetails, getDonationDetailsById, updateDonationDetails, deleteDonationDetails, getDonationDetailssByUser, getAllDonations } = require("../controller/donation_controller")

// ... (swagger docs skipped for brevity in replacement, but ensuring import is updated above)

router.route('/createdonations').post(createDonationDetails);
router.route('/donations').get(getAllDonations);
router.route('/getdonationsbyid/:id').get(getDonationDetailsById);
router.route('/updatedonations/:id').put(updateDonationDetails);
router.route('/deletedonations/:id').delete(deleteDonationDetails);
router.route('/getbyuserdonations/:userId').get(getDonationDetailssByUser);
/**
 * @swagger
 * components:
 *   schemas:
 *     Donation:
 *       type: object
 *       required:
 *         - DonationId
 *         - CampaignTitle
 *         - CampaignDescription
 *         - Categories
 *         - GoalAmount
 *         - userId
 *       properties:
 *         DonationId:
 *           type: string
 *           description: Unique ID for the donation
 *         CampaignTitle:
 *           type: string
 *           description: Title of the donation campaign
 *         CampaignDescription:
 *           type: string
 *           description: Description of the donation campaign
 *         Categories:
 *           type: string
 *           description: Category of the donation
 *         GoalAmount:
 *           type: string
 *           description: Target amount to be raised
 *         PaymentMethods:
 *           type: string
 *           description: Accepted payment methods
 *         Paymentdetail:
 *           type: string
 *           description: Details of the payment
 *         AllowCommenting:
 *           type: string
 *           description: Indicates if comments are allowed
 *         Comment:
 *           type: string
 *           description: Comments on the donation
 *         userId:
 *           type: string
 *           description: Comments on the donation
 *       example:
 *         DonationId: "D12345"
 *         CampaignTitle: "Help Save the Ocean"
 *         CampaignDescription: "A campaign to fund ocean cleanup projects"
 *         Categories: "Environment"
 *         GoalAmount: "5000"
 *         PaymentMethods: "Credit Card, PayPal"
 *         Paymentdetail: "PayPal account details"
 *         AllowCommenting: "true"
 *         Comment: "Great cause!"
 *         userId: "85201"
 */

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: Donation management API
 */

/**
 * @swagger
 * /api/v1/createdonations:
 *   post:
 *     summary: Create a new donation
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Donation'
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       500:
 *         description: Server error
 */







/**
 * @swagger
 * /api/v1/getdonationsbyid/{id}:
 *   get:
 *     summary: Get a donation by ID
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The donation ID
 *     responses:
 *       200:
 *         description: Donation found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donation'
 *       404:
 *         description: Donation not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/updatedonations/{id}:
 *   put:
 *     summary: Update a donation
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The donation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Donation'
 *     responses:
 *       200:
 *         description: Donation updated successfully
 *       404:
 *         description: Donation not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/deletedonations/{id}:
 *   delete:
 *     summary: Delete a donation
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The donation ID
 *     responses:
 *       200:
 *         description: Donation deleted successfully
 *       404:
 *         description: Donation not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/getbyuserdonations/{userId}:
 *   get:
 *     summary: Get donations by user ID
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of donations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Donation'
 *       500:
 *         description: Server error
 */






// const donationController = require('../controller/donation_controller');

router.route('/createdonations').post(createDonationDetails);
router.route('/donations').get(getAllDonations);
router.route('/getdonationsbyid/:id').get(getDonationDetailsById);
router.route('/updatedonations/:id').put(updateDonationDetails);
router.route('/deletedonations/:id').delete(deleteDonationDetails);
router.route('/getbyuserdonations/:userId').get(getDonationDetailssByUser);

module.exports = router;
