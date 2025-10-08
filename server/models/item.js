const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/lost_and_found");

const itemSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    // Distinguishes between lost/found posts
    type: String,
    enum: ["lost", "found"],
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("items", itemSchema);
