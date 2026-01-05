const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId:{ type: String,  },
  title: { type: String,  },
  DatePosted: { type: String,  },
  JobType: { type: String, },
  Required: { type: String,  },
  Status: { type: String,  },
  Companyname:{ type: String,  },
  CompanyOverview:{type: String,},
  RoleAndResposiblity:{type: String,},
  CandidateQualification:{type: String,},
  RequiredSkills:{type: String,},
});

module.exports = mongoose.model('Job', jobSchema);
