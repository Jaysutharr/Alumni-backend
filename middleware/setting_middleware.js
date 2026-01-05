const moment = require('moment');
const Setting = require('../model/setting_model'); // Import the Setting model

// Function to generate a unique ID based on the specified operation
async function generateId(operation) {
    try {
        let buildedId;
        let setting;

        // Combine operation with a constant prefix to create a unique identifier
        const operationKey = operation;

        // Get the last ID for the specified operation
        setting = await Setting.findOne({ name: operationKey });
        let lastId = setting ? parseInt(setting.value) : 0;

        // Increment the last ID and update/create the setting
        lastId++;
        if (setting) {
            await Setting.updateOne({ name: operationKey }, { value: lastId });
        } else {
            await Setting.create({ name: operationKey, value: lastId });
        }

        // Build the ID based on the operation
        switch (operation) {
            case 'user':
                buildedId = `UI-${lastId.toString().padStart(6, '0')}`;
                break;
            case 'admin':
                buildedId = `AD-${lastId.toString().padStart(4, '0')}`;
                break;
            default:
                throw new Error('Invalid operation type. Only "user" and "admin" are allowed.');
        }

        return buildedId;
    } catch (error) {
        throw error;
    }
}

// Export the function
module.exports = generateId;
