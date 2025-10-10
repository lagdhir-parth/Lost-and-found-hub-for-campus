const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  }, // item owner
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  }, // user who clicked claim
  item: { type: mongoose.Schema.Types.ObjectId, ref: "items", required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
