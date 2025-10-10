const express = require("express");
const notificationModel = require("../models/notification.js");
// import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

// POST /notification/ask-claim
router.post("/ask-claim", async (req, res) => {
  try {
    const { itemId, ownerId } = req.body;

    if (!itemId || !ownerId) {
      return res.status(400).json({ message: "Missing itemId or ownerId" });
    }

    // Create notification
    const newNotification = await notificationModel.create({
      receiver: ownerId,
      sender: req.user._id, // user who clicked
      item: itemId,
      message: `${req.user.name} says this item might belong to them.`,
    });

    res.status(201).json({ success: true, notification: newNotification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /notification/my
router.get("/my", async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({ receiver: req.user._id, isRead: false })
      .populate("sender", "name email")
      .populate("item", "itemName")
      .sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

// PATCH /notification/:id/read → mark notification as read
router.patch("/:id/read", isLoggedIn, async (req, res) => {
  try {
    const notificationId = req.params.id;

    const updated = await notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json({ success: true, notification: updated });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Server error" });
  }
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "User not authenticated" });
}

module.exports = router;
