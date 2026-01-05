const event = require("../model/event_model")
const dondetails = require("../model/donationdetails_model")
//     } catch (error) {
//       res.json({
//         success: false,
//         message: `Something went wrong: ${error.message}`,
//         data: null,
//       });
//     }
//   };

const content = require("../model/Content_model")
exports.vieweventDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalCount = await event.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const result = await event.find().sort({ createdAt: -1 }).skip(skip)
      .limit(limit)
      .exec();
    res.json({
      count: result.length,
      success: true,
      message: "Get event Details",
      totalCount,
      totalPages,
      data: result
    })
  } catch (error) {
    res.json({
      success: false,
      message: `Something went worng ` + error.message,
      data: null
    })
  }
}
exports.deleteeventDetails = async (req, res) => {
  try {
    const result = await event.findOneAndDelete({ eventId: req.params.eventId })
    res.json({
      success: true,
      message: "Delete event Details",
      data: null
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Something  went wrong" + error.message,
      data: null
    })
  }
}
exports.updateeventDetails = async (req, res) => {
  try {
    const result = await event.findOneAndUpdate({ eventId: req.body.eventId }, req.body, {
      new: true,
      runValidators: true,
    }).sort({ updatedAt: -1 })
    res.json({
      success: true,
      message: "Update event Details",
      data: result
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Something  went wrong" + error.message,
      data: null
    })
  }
}
exports.getSingleeventDetails = async (req, res) => {
  try {
    const result = await event.findOne({ eventId: req.params.eventId })
    res.json({
      success: true,
      message: "Get a Single event Details",
      data: result
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Something  went wrong" + error.message,
      data: null
    })
  }
}

exports.getallcollectionDetails = async (req, res) => {
  console.log("getdonation api");

  try {
    // Extract the page and limit parameters from the request query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided

    // Validate page and limit parameters
    if (isNaN(page) || page <= 0 || isNaN(limit) || limit <= 0) {
      return res.status(400).json({
        message: "Invalid page or limit parameters. Please provide positive integers.",
      });
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch donations with pagination
    const donations = await dondetails.find().skip(skip).limit(limit).exec();
    console.log("Fetched Donations: ", donations);

    // If no donations are found
    if (!donations || donations.length === 0) {
      return res.status(404).json({
        message: "No donations found for the given page and limit.",
      });
    }

    // Get the total count of donations for pagination metadata
    const totalCount = await dondetails.countDocuments();
    console.log("Total Donation Count: ", totalCount);

    // Return the paginated data along with metadata
    res.status(200).json({
      message: "Donations retrieved successfully",
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit), // Calculate total number of pages
      data: donations,
    });
  } catch (err) {
    console.error("Error retrieving donations:", err);
    res.status(500).json({
      message: "Failed to retrieve donations",
      error: err.message,
    });
  }
};

exports.getallcontentdetails = async (req, res) => {
  try {
    const contentList = await content.find();
    res.status(200).json(contentList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error: error.message });
  }
};