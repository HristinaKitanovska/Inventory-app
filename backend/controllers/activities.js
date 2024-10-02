const Activity = require("../models/activity");

module.exports = {
  getAllActivities: async (req, res) => {
    try {
      const logs = await Activity.find()
        .populate("item", "name")
        .populate("category", "name")
        .populate("user", "name role")
        .sort({ createdAt: -1 });

      res.status(200).json({
        error: false,
        message: "Activity logs fetched successfully",
        logs,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "Error fetching activity logs",
        errorDetails: error.message,
      });
    }
  },
};
