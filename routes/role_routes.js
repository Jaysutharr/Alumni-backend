


const express = require("express")
const {CreateroleDetails,viewroleDetails,deleteroleDetails,updateroleDetails,getSingleroleDetails} = require("../controller/role_controller")
const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         role:
 *           type: string
 *           description: The role name.
 */


/**
 * @swagger
 * /api/v1/CreateroleDetails:
 *   post:
 *     summary: Create or update a role with permissions
 *     tags: [role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       '200':
 *         description: Role created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                 message:
 *                   type: string
 *                   description: Description of the result
 *                 role:
 *                   $ref: '#/components/schemas/Role'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if an error occurred
 *                 message:
 *                   type: string
 *                   description: Description of the error
 */


router.route("/CreateroleDetails").post(CreateroleDetails)

// Define other routes similarly...

/**
 * @swagger
 * /api/v1/viewroleDetails:
 *   get:
 *     summary: get all role
 *     tags: [role]
 *     responses:
 *       200:
 *         Role: get All role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.route("/viewroleDetails").get(viewroleDetails)




  /**
 * @swagger
 * /api/v1/deleteroleDetails/{roleId}:
 *   delete:
 *     summary: Delete a Complaint by ID
 *     tags: [role]
 *     parameters:
 *         - in: path
 *           name: roleId
 *           required: true
 *           Role: ID of the Complaint to delete
 *           schema:
 *              type: string
 *     responses:
 *       200:
 *         Role: Complaint deleted successfully
 */

router.route("/deleteroleDetails/:roleId").delete(deleteroleDetails)

/**
 * @swagger
 * /api/v1/updateroleDetails:
 *   post:
 *     summary: Update Complaint Details
 *     tags: [role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         Role: Complaint Details successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       500:
 *         Role: Server error
 */

router.route("/updateroleDetails").post(updateroleDetails)
/**
 * @swagger
 * /api/v1/getSingleroleDetails/{role}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [role]
 *     Role: Retrieve a role by their unique ID.
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         Role: ID of the role to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         Role: Successfully retrieved the role
 *       404:
 *         Role: role not found
 */
router.route("/getSingleroleDetails/:role").get(getSingleroleDetails)
module.exports = router

