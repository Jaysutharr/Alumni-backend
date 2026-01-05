const Job = require('../model/job_model');

// Create a job
exports.createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const {
      jobId,
      title,
      DatePosted,
      JobType,
      Required,
      Status,
      Companyname,
      RoleAndResposiblity,
      CandidateQualification,
      RequiredSkills,
    } = req.query;

    // Building the search filter
    const searchFilter = {};
    if (jobId) searchFilter.jobId = jobId;
    if (title) searchFilter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    if (DatePosted) searchFilter.DatePosted = DatePosted;
    if (JobType) searchFilter.JobType = JobType;
    if (Required) searchFilter.Required = { $regex: Required, $options: "i" };
    if (Status) searchFilter.Status = Status;
    if (Companyname) searchFilter.Companyname = { $regex: Companyname, $options: "i" };
    if (RoleAndResposiblity)
      searchFilter.RoleAndResposiblity = { $regex: RoleAndResposiblity, $options: "i" };
    if (CandidateQualification)
      searchFilter.CandidateQualification = { $regex: CandidateQualification, $options: "i" };
    if (RequiredSkills)
      searchFilter.RequiredSkills = { $regex: RequiredSkills, $options: "i" };

    // Query the database with the search filter
    const jobs = await Job.find(searchFilter);

    // Respond with the results
    res.status(200).json({
      success: true,
      message: "Job details retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve job details",
      error: error.message,
    });
  }
};


// Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get jobs by status
exports.getJobsByStatus = async (req, res) => {
  try {
    const { status } = req.query; // Get the status from query parameters

    if (!status) {
      return res.status(200).json({ message: 'Status query parameter is required' });
    }

    const jobs = await Job.find({ Status: status }); // Filter jobs by status

    if (!jobs || jobs.length === 0) {
      return res.status(200).json({ message: `No jobs found with status: ${status}` });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Assuming Job is your Mongoose model

// Get jobs by JobType
exports.getJobsByJobType = async (req, res) => {
  try {
    const { jobType } = req.query;

    // Validate the query parameter
    if (!jobType) {
      return res.status(200).json({
        success: false,
        message: 'JobType is required.',
      });
    }

    // Find jobs matching the JobType
    const jobs = await Job.find({ JobType: jobType });

    // Respond with the results
    res.status(200).json({
      success: true,
      message: `Jobs with JobType: ${jobType} retrieved successfully.`,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching jobs.',
      error: error.message,
    });
  }
};
