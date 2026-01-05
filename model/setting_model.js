const mongoose = require('mongoose');

// Define the schema for the Setting model
const settingSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed, // Can store any type of data
        required: true
    }
});

// Create the Setting model using the schema
const Setting = mongoose.model('Setting', settingSchema);

// Export the Setting model
module.exports = Setting;
