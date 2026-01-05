const DonationDetails = require('../model/donationdetails_model');
exports.createDonationDetails = async (req, res) => {
  try {
    const donationDetails = await DonationDetails.create({
      DonationId: Math.floor(10000 + Math.random() * 90000),
      CampaignTitle: req.body.CampaignTitle,
      CampaignDescription: req.body.CampaignDescription,
      Categories: req.body.Categories,
      GoalAmount: req.body.GoalAmount,
      PaymentMethods: req.body.PaymentMethods,
      Paymentdetail: req.body.Paymentdetail,
      AllowCommenting: req.body.AllowCommenting,
      Comment: req.body.Comment,
      userId: req.body.userId,
    });

    // Send a success response
    res.status(200).json({
      message: "Donation added successfully", // Corrected spelling
      data: donationDetails,  // Donation details will be saved in `data`
    });
  } catch (err) {
    // Handle error response
    res.status(500).json({
      message: "Failed to add donation",
      error: err.message,
    });
  }
};




exports.getDonationDetailsById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`[getDonationDetailsById] Fetching for ID: ${id}`);

    let query = { DonationId: id };

    // If id is numeric, also check for Number type in case of mixed schema
    if (!isNaN(id)) {
      query = { $or: [{ DonationId: String(id) }, { DonationId: Number(id) }] };
    }

    let donationDetails = await DonationDetails.findOne(query);

    // If not found by DonationId, and looks like ObjectId, try findById
    if (!donationDetails && /^[0-9a-fA-F]{24}$/.test(id)) {
      console.log(`[getDonationDetailsById] Not found by DonationId, trying findById for: ${id}`);
      donationDetails = await DonationDetails.findById(id);
    }

    if (!donationDetails) {
      console.log(`[getDonationDetailsById] Donation not found for ID: ${id}`);
      return res.status(404).json({ error: 'DonationDetails not found' });
    }

    console.log(`[getDonationDetailsById] Found donation: ${donationDetails._id}`);
    res.status(200).json(donationDetails);
  } catch (err) {
    console.error(`[getDonationDetailsById] Error:`, err);
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
};

exports.updateDonationDetails = async (req, res) => {
  try {
    const donationDetails = await DonationDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donationDetails) return res.status(404).json({ error: 'DonationDetails not found' });
    res.status(200).json(donationDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDonationDetails = async (req, res) => {
  try {
    const donationDetails = await DonationDetails.findByIdAndDelete(req.params.id);
    if (!donationDetails) return res.status(404).json({ error: 'DonationDetails not found' });
    res.status(200).json({ message: 'DonationDetails deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await DonationDetails.find();
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDonationDetailssByUser = async (req, res) => {
  try {
    const donationDetailss = await DonationDetails.find({ userId: req.params.userId });
    res.status(200).json(donationDetailss);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export all the route handlers

