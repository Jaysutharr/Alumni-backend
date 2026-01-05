// role_model.js

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleid:{
        type: String
    },
  role: { type: String, required: true }, // Ensure role field is required
 

});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
