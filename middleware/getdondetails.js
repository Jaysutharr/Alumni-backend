const  DonationDetails = require("../model/donationdetails_model")
const getalldonationdetails = async (req, res) => {
    
    try {
      // Use the Donation model to fetch all donation data
      const donations =  await DonationDetails.find()
      console.log(donations);
       
    //   res.json({
    //       count: donations.length,
    //     message: "Donations retrieved successfully",
    //     data: donations,
    //   });
    } catch (err) {
      console.error("Error retrieving donations:", err);
    //   res.json({
    //     message: "Failed to retrieve donations",
    //     error: err.message,
    //   });
    }
  };
  getalldonationdetails()