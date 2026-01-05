const express = require('express');
const router = express.Router();
const Profile = require('../model/profile_model'); // Assuming the schema is in 'models/profile.js'

// Create a new profile
router.post('/addprofile', async (req, res) => {
    try {
        const {profileData} = req.body;
        const newProfile = new Profile(profileData);
        await newProfile.save();
        res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile', error: error.message });
    }
});

// Get profiles by userId
router.get('/getprofilebyuserid/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const profiles = await Profile.find({ userId });
        if (profiles.length === 0) {
            return res.status(404).json({ message: 'No profiles found for this user' });
        }
        res.status(200).json({ message: 'Profiles retrieved successfully', profiles });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving profiles', error: error.message });
    }
});

// Update a profile
router.put('/updateprofile/:profileId', async (req, res) => {
    try {
        const { profileId } = req.params;
        const updatedData = req.body;
        const updatedProfile = await Profile.findByIdAndUpdate(profileId, updatedData, { new: true });

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

// Delete a profile
router.delete('/:profileId', async (req, res) => {
    try {
        const { profileId } = req.params;
        const deletedProfile = await Profile.findByIdAndDelete(profileId);

        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile deleted successfully', profile: deletedProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
});






/**
 * @swagger
 * /api/v1/addprofile:
 *   post:
 *     summary: Create a new profile
 *     tags:
 *       - Profiles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileid:
 *                 type: string
 *               userId:
 *                 type: string
 *               InstitutionName:
 *                 type: string
 *               Department:
 *                 type: string
 *               Batch:
 *                 type: string
 *               YearofGraduation:
 *                 type: string
 *               CourseCertificationName:
 *                 type: string
 *               InstitutionOrganization:
 *                 type: string
 *               YearofCompletion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       500:
 *         description: Error creating profile
 * 
 * /api/v1/getprofilebyuserid/{userId}:
 *   get:
 *     summary: Get profiles by userId
 *     tags:
 *       - Profiles
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID to fetch profiles for
 *     responses:
 *       200:
 *         description: Profiles retrieved successfully
 *       404:
 *         description: No profiles found for this user
 *       500:
 *         description: Error retrieving profiles
 * 
 * /api/v1/updateprofile/{profileId}:
 *   put:
 *     summary: Update a profile
 *     tags:
 *       - Profiles
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               InstitutionName:
 *                 type: string
 *               Department:
 *                 type: string
 *               Batch:
 *                 type: string
 *               YearofGraduation:
 *                 type: string
 *               CourseCertificationName:
 *                 type: string
 *               InstitutionOrganization:
 *                 type: string
 *               YearofCompletion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Error updating profile
 * 
 *   delete:
 *     summary: Delete a profile
 *     tags:
 *       - Profiles
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile ID to delete
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Error deleting profile
 */

module.exports = router;
