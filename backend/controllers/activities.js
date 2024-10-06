const Activity = require("../models/activity");

module.exports = {
  getAllActivities: async (req, res) => {
    try {
      const activities = await Activity.find()
        .populate("item", "name")
        .populate("category", "name")
        .populate("user", "name role")
        .sort({ createdAt: -1 });

      const logsWithItemInfo = activities.map((log) => ({
        ...log._doc,
        item: log.item || { name: log.itemName }, // Fallback to itemName
      }));

      res.status(200).json({
        error: false,
        message: "Activity logs fetched successfully",
        logsWithItemInfo,
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: "Error fetching activity logs",
        errorDetails: error.message,
      });
    }
  },
  getRecentActivities: async (req, res) => {
    try {
      const activities = await Activity.find()
        .populate("item", "name")
        .populate("category", "name")
        .populate("user", "name role")
        .sort({ createdAt: -1 })
        .limit(4);

      const logsWithItemInfo = activities.map((log) => ({
        ...log._doc,
        item: log.item || { name: log.itemName }, // Fallback to itemName
      }));

      res.status(200).json({
        error: false,
        message: "Activity logs fetched successfully",
        logsWithItemInfo,
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
