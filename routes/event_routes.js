const express = require("express");
const { vieweventDetails, deleteeventDetails, updateeventDetails, getSingleeventDetails, getallcollectionDetails, getallcontentdetails } = require("../controller/event_controller");
const router = express.Router();
const authMiddleware = require("../middleware/authJwt")
/**
 * @swagger
 * components:
 *   schemas:
 *     event:
 *       type: object
 *       required:
 *         - eventId
 *         - EventName
 *         - DateTime
 *         - EventType
 *         - NoOfAttendees
 *         - Status
 *       properties:
 *         eventId:
 *           type: integer
 *           description: Unique identifier for the event.
 *         EventName:
 *           type: string
 *           description: Date when the event was submitted.
 *         DateTime:
 *           type: string
 *           description: Name of the person filing the event.
 *         EventType:
 *           type: string
 *           description: Location where the event was issued.
 *         NoOfAttendees:
 *           type: string
 *           description: Type or event of the event.
 *         Status:
 *           type: string
 *           description: Priority level of the event.
 *       example:
 *         eventId: 1
 *         EventName: "Annual Alumni gala"
 *         DateTime: "2024-02-21"
 *         EventType: "In-person"
 *         NoOfAttendees: "100"
 *         Status: published
 */

/**
 * @swagger
 * /api/v1/vieweventDetails:
 *   get:
 *     summary: Get all events with pagination
 *     tags: [event]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination. Defaults to 1.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of items to return per page. Defaults to 10.
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/event'
 */

router.get("/vieweventDetails", vieweventDetails);

/**
 * @swagger
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: x-access-token
 *     in: header
 *     description: Enter your access token in the format 'Bearer <token>'.
 * 
 * /api/v1/CreateeventDetails:
 *   post:
 *     summary: Add a new event
 *     tags: 
 *       - event
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Access token in the format 'Bearer <token>'
 *         required: true
 *         type: string
 *       - in: formData
 *         name: EventName
 *         description: Name of the event
 *         required: true
 *         type: string
 *       - in: formData
 *         name: DateTime
 *         description: Date and time of the event (ISO 8601 format)
 *         required: true
 *         type: string
 *         format: date-time
 *       - in: formData
 *         name: EventType
 *         description: Type of the event
 *         required: true
 *         type: string
 *       - in: formData
 *         name: NoOfAttendees
 *         description: Number of attendees for the event
 *         required: true
 *         type: integer
 *       - in: formData
 *         name: Status
 *         description: Current status of the event (e.g., Upcoming, Completed)
 *         required: true
 *         type: string
 *       - in: formData
 *         name: eventImage
 *         description: Image file for the event
 *         required: true
 *         type: file
 *     responses:
 *       '201':
 *         description: Event created successfully
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
 *                   example: "Event created successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     eventId:
 *                       type: integer
 *                       example: 65432
 *                     EventName:
 *                       type: string
 *                       example: "Annual Meetup"
 *                     DateTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-20T15:00:00"
 *                     EventType:
 *                       type: string
 *                       example: "Corporate"
 *                     NoOfAttendees:
 *                       type: integer
 *                       example: 50
 *                     Status:
 *                       type: string
 *                       example: "Upcoming"
 *                     eventImage:
 *                       type: string
 *                       example: "https://your-s3-bucket.s3.amazonaws.com/1677761234567-event-image.jpg"
 *                     createdby:
 *                       type: string
 *                       example: "JohnDoe"
 *                     isDeleted:
 *                       type: boolean
 *                       example: false
 *                     title: 
 *                       type: string
 *                       example: tdfdd
 *       '500':
 *         description: Server error
 */



const AWS = require("aws-sdk");
const multer = require("multer");
// const authMiddleware = require("../middleware/authJwt"); // Ensure this middleware is defined
const event = require("../model/event_model"); // Your event model

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer Setup for File Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// S3 File Upload Function
const uploadToS3 = async (file, bucketName) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const data = await s3.upload(params).promise();
    return data.Location; // S3 URL
  } catch (error) {
    throw new Error(`Failed to upload file to S3: ${error.message}`);
  }
};

// Create Event Handler
const CreateeventDetails = async (req, res) => {
  try {
    const userId = req.user ? req.user.name : (req.body.createdby || "Admin");

    let eventImageUrl = "";
    if (req.file) {
      eventImageUrl = await uploadToS3(req.file, process.env.AWS_S3_BUCKET_NAME);
    } else if (req.body.eventImage) {
      eventImageUrl = req.body.eventImage;
    } else {
      return res.status(400).json({ success: false, message: "Event image is required." });
    }

    const result = await event.create({
      eventId: Math.floor(Math.random() * 100000) + 1,
      EventName: req.body.EventName,
      title: req.body.title,
      DateTime: req.body.DateTime,
      EventType: req.body.EventType,
      NoOfAttendees: req.body.NoOfAttendees,
      Status: req.body.Status,
      eventImage: eventImageUrl,
      createdby: userId,
      isDeleted: false,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong: ${error.message}`,
      data: null,
    });
  }
};

// Route for Creating Event
router.post(
  "/CreateeventDetails",
  [], // Removed authMiddleware.verifyToken and upload.single for JSON support
  CreateeventDetails
);




/**
 * @swagger
 * /api/v1/deleteeventDetails/{eventId}:
 *   delete:
 *     summary: Delete a event by ID
 *     tags: [event]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: event deleted successfully
 */
router.delete("/deleteeventDetails/:eventId", deleteeventDetails);

/**
 * @swagger
 * /api/v1/updateeventDetails:
 *   post:
 *     summary: Update event Details
 *     tags: [event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       200:
 *         description: event Details successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/event'
 *       500:
 *         description: Server error
 */
router.post("/updateeventDetails", updateeventDetails);

/**
 * @swagger
 * /api/v1/getSingleeventDetails/{eventId}:
 *   get:
 *     summary: Get a event by ID
 *     tags: [event]
 *     description: Retrieve a event by its unique ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the event
 *       404:
 *         description: event not found
 */
router.get("/getSingleeventDetails/:eventId", getSingleeventDetails);


/**
 * @swagger
 * /api/v1/getallcollectionDetails:
 *   get:
 *     summary: Get all donation details with pagination
 *     tags: [event]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to retrieve
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of donations per page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of donations with pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Donations retrieved successfully"
 *                 totalCount:
 *                   type: integer
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Donation'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve donation details"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.get('/getallcollectionDetails', getallcollectionDetails);


/**
 * @swagger
 * /api/v1/getcontent:
 *   get:
 *     summary: Get all content
 *     description: Retrieves a list of all content.
 *     tags:
 *       - Content
 *     responses:
 *       200:
 *         description: A list of content.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 *       500:
 *         description: Error fetching content.
 */
router.get('/getcontent', getallcontentdetails);


module.exports = router;
