const mongoose = require("mongoose");
require("colors");

const db = () => {
    const connectWithRetry = () => {
        mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Increase timeout
    socketTimeoutMS: 30000, 
        }).then(() => {
            console.log("MONGO CONNECTED".bgRed);
        }).catch((error) => {
            console.log(`DB MONGO ERROR: ${error}`.red);
            setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
        });
    };

    connectWithRetry(); // Initiate the connection
};

module.exports = db;
