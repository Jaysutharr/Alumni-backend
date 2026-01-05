const express = require('express');
const router = express.Router();
const AcademicProfile = require('../model/academicProfile_model');

// Route to create a new student academic profile
router.post('/create', async (req, res) => {
    try {
        const { studentId, name, program, yearOfStudy, courses, overallGPA, graduationYear, contactDetails } = req.body;

        // Create a new academic profile
        const newProfile = new AcademicProfile({
            studentId,
            name,
            program,
            yearOfStudy,
            courses,
            overallGPA,
            graduationYear,
            contactDetails
        });

        // Save to the database
        await newProfile.save();

        res.status(201).json({ success: true, message: 'Academic profile created successfully', data: newProfile });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create academic profile', error: error.message });
    }
});


// Route to get all student academic profiles
router.get('/profiles', async (req, res) => {
    try {
        // Fetch all academic profiles
        const profiles = await AcademicProfile.find();

        // If no profiles are found, return a message
        if (!profiles || profiles.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No academic profiles found.'
            });
        }

        // Return the profiles
        res.status(200).json({
            success: true,
            message: 'Academic profiles retrieved successfully.',
            data: profiles
        });
    } catch (error) {
        // Handle any errors during database query
        res.status(500).json({
            success: false,
            message: 'Error retrieving academic profiles.',
            error: error.message
        });
    }
});

// Route to get academic profile by student ID
router.get('/profile/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;

        // Fetch academic profile by studentId
        const profile = await AcademicProfile.findOne({ studentId });

        // If profile not found, return a 404 message
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: `No academic profile found for student ID: ${studentId}`
            });
        }

        // Return the found profile
        res.status(200).json({
            success: true,
            message: `Academic profile for student ID: ${studentId} retrieved successfully.`,
            data: profile
        });
    } catch (error) {
        // Handle any errors during database query
        res.status(500).json({
            success: false,
            message: `Error retrieving profile for student ID: ${studentId}`,
            error: error.message
        });
    }
});



// Delete academic profile by ID
router.delete('/profile/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the academic profile by ID
        const profile = await AcademicProfile.findByIdAndDelete(id);

        // Check if the profile exists
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: `Profile not found for ID: ${id}`
            });
        }

        // If deleted successfully, return success message
        res.status(200).json({
            success: true,
            message: `Academic profile with ID: ${id} deleted successfully.`,
            data: profile // You can return the deleted profile data if needed
        });
    } catch (error) {
        // Handle any errors during the database operation
        res.status(500).json({
            success: false,
            message: `Error deleting profile with ID: ${id}`,
            error: error.message
        });
    }
});




// Update student academic profile by ID
router.put('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;  // Assuming the request body contains the fields to be updated

    try {
        // Find the academic profile by ID and update it
        const updatedProfile = await AcademicProfile.findByIdAndUpdate(
            id,
            { $set: updates }, // Use $set to update only the fields provided in the request
            { new: true, runValidators: true } // Return the updated document and apply validation
        );

        // Check if the profile exists
        if (!updatedProfile) {
            return res.status(404).json({
                success: false,
                message: `Profile not found for ID: ${id}`
            });
        }

        // If updated successfully, return the updated profile
        res.status(200).json({
            success: true,
            message: `Academic profile with ID: ${id} updated successfully.`,
            data: updatedProfile // Return the updated profile
        });
    } catch (error) {
        // Handle any errors that occur during the update operation
        console.error(error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: `Error updating profile with ID: ${id}`,
            error: error.message
        });
    }
});




module.exports = router;
