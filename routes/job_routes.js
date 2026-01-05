// job.routes.js
const express = require('express');
const router = express.Router();
const jobController = require('../controller/Job_controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - DatePosted
 *         - salary
 *         - JobType
 *         - Required
 *         - Status
 *         - Companyname
 *         - CompanyOverview
 *         - RoleAndResposiblity
 *         - CandidateQualification
 *         - RequiredSkills
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the job
 *         title:
 *           type: string
 *           description: The title of the job
 *         DatePosted:
 *           type: string
 *           description: Job description
 *         JobType:
 *           type: number
 *           description: Salary offered for the job
 *         Required:
 *           type: string
 *           description: Location of the job
 *         Status:
 *           type: string
 *           description: Location of the job
 *       example:
 *         title: Software Engineer
 *         DatePosted: 10-01-2025
 *         JobType: Hybrid
 *         Required: 100
 *         Status: Posted
 *         Companyname: ABCD
 *         CompanyOverview: lorem ispus
 *         RoleAndResposiblity: lorem ispus
 *         CandidateQualification: lorem ispus
 *         RequiredSkills: lorem ispus
 */


/**
 * @swagger
 * /api/v1/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 */
router.post('/jobs', jobController.createJob);

/**
 * @swagger
 * /api/v1/jobs:
 *   get:
 *     summary: Get all jobs with search and pagination options
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of jobs per page
 *       - in: query
 *         name: jobId
 *         schema:
 *           type: string
 *         description: Search by Job ID
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search by job title (case-insensitive)
 *       - in: query
 *         name: DatePosted
 *         schema:
 *           type: string
 *         description: Search by date the job was posted
 *       - in: query
 *         name: JobType
 *         schema:
 *           type: string
 *         description: Search by job type
 *       - in: query
 *         name: Required
 *         schema:
 *           type: string
 *         description: Search by required qualifications or experience
 *       - in: query
 *         name: Status
 *         schema:
 *           type: string
 *         description: Search by job status
 *       - in: query
 *         name: Companyname
 *         schema:
 *           type: string
 *         description: Search by company name (case-insensitive)
 *       - in: query
 *         name: RoleAndResposiblity
 *         schema:
 *           type: string
 *         description: Search by roles and responsibilities (case-insensitive)
 *       - in: query
 *         name: CandidateQualification
 *         schema:
 *           type: string
 *         description: Search by candidate qualifications (case-insensitive)
 *       - in: query
 *         name: RequiredSkills
 *         schema:
 *           type: string
 *         description: Search by required skills (case-insensitive)
 *     responses:
 *       200:
 *         description: List of jobs
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
 *                   example: "Job details retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       500:
 *         description: Internal server error
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
 *                   example: "Failed to retrieve job details"
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

router.get('/jobs', jobController.getJobs);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job to retrieve
 *     responses:
 *       200:
 *         description: A single job
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 */
router.get('/jobs/:id', jobController.getJobById);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   put:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 */
router.put('/jobs/:id', jobController.updateJob);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */
router.delete('/jobs/:id', jobController.deleteJob);





/**
 * @swagger
 * /api/v1/getjobbystatus:
 *   get:
 *     summary: Get jobs by status
 *     description: Retrieve a list of jobs filtered by their status
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         description: The status of the jobs to retrieve (e.g., Posted, Closed)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       400:
 *         description: Missing or invalid status query parameter
 *       404:
 *         description: No jobs found with the specified status
 *       500:
 *         description: Server error
 */
router.get('/getjobbystatus', jobController.getJobsByStatus);



/**
 * @swagger
 * /api/v1/jobs/byJobType:
 *   get:
 *     summary: Retrieve all jobs by JobType
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: jobType
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of job to filter by (e.g., "Full-Time", "Part-Time").
 *     responses:
 *       200:
 *         description: Successfully retrieved jobs by JobType.
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
 *                   example: Jobs with JobType Full-Time retrieved successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       400:
 *         description: Missing or invalid JobType query parameter.
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
 *                   example: JobType is required.
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
 *                   example: An error occurred while fetching jobs.
 */
router.get('/byJobType', jobController.getJobsByJobType);

module.exports = router;
