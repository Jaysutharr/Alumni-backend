const mongoose = require('mongoose');

// Define the schema for academic profile
const academicProfileSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    program: {
        type: String,
        required: true,
        trim: true // Example: BCA, B.Tech, etc.
    },
    yearOfStudy: {
        type: Number,
        required: true, // Example: 1, 2, 3, 4 for respective years of study
    },
    courses: [
        {
            courseCode: { 
                type: String, 
                required: true 
            },
            courseName: { 
                type: String, 
                required: true 
            },
            grade: {
                type: String,
                enum: ['A', 'B', 'C', 'D', 'E', 'F', 'NA'], // NA for not available
                required: true
            },
            credits: { 
                type: Number, 
                required: true 
            }
        }
    ],
    overallGPA: {
        type: Number, 
        required: true,
        min: 0.0,
        max: 10.0 // Assuming GPA scale of 0-10
    },
    graduationYear: {
        type: Number,
        required: true
    },
    contactDetails: {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address']
        },
        phone: {
            type: String,
            required: true,
            trim: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the `updatedAt` field before each save
academicProfileSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create the model from the schema and export it
const AcademicProfile = mongoose.model('AcademicProfile', academicProfileSchema);

module.exports = AcademicProfile;
