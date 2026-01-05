// event_model.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId:{
        type: String
    },
  EventName: { type: String,  }, 
  title:{type: String},// Ensure event field is required
  DateTime: {
   type: Date,
   default: Date.now // Use the function reference, not its invocation
},

 EventType:{
    type: String, 
 },
 NoOfAttendees:{
    type: String,  
 },
 Status:{
    type: String,  
 },
eventImage:{String,  }

});

const event = mongoose.model('event', eventSchema);

module.exports = event;
