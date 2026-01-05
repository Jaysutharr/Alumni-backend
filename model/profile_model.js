

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profileid:{
        type: String
    },
    userId:{
        type: String
    },
    InstitutionName: { type: String, }, // Ensure profile field is required
    Department:{type: String, },
    Batch:{type: String,},
    YearofGraduation:{type: String,},
    CourseCertificationName:{type: String,},
    InstitutionOrganization:{type: String,},
    YearofCompletion:{type: String,},

});
profileSchema.pre('save', function(next) {
    if (!this.profileid) {
        this.profileid = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a 5-digit ID
    }
    next();
});
const profile = mongoose.model('profile', profileSchema);

module.exports = profile;
