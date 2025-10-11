const express = require("express");
const itemModel = require("../models/item");
const userModel = require("../models/user");
const router = express.Router();
const fs = require("fs");

const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

// router.post("/createItem", async function (req, res) {
//   //const { itemName, location, category, description } = req.body;
//   const item = new itemModel({
//     itemName: "Hello",
//     location:"Mara ghre",
//     category: 'key',
//     description: 'Hello world',
//   });
//   try {
//         // 🚨 FIX: Save the document to the database
//         const savedItem = await item.save();

//         // Respond with the saved document
//         res.status(201).json(savedItem); // Use 201 Created status

//     } catch (error) {
//         // Handle validation or database errors
//         res.status(500).json({ message: "Failed to create item", error: error.message });
//     }
// });

// --- MULTER SETUP ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Files will be saved in the 'uploads' folder relative to the server script
    cb(null, path.join(__dirname, "..", "public", "images"));
  },
  filename: function (req, file, cb) {
    // Generate 12 random bytes file name:
    crypto.randomBytes(12, (err, bytes) => {
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

// Use upload.single() with the name of your file input field ('item-img')
router.post(
  "/createItem",
  upload.single("item-img"),
  async function (req, res) {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { itemName, location, category, description, type } = req.body;
    // req.file contains details about the uploaded file
    const imagePath = req.file ? req.file.path : null;
    const filename = req.file ? req.file.filename : null;

    console.log("req.user:", req.user);

    //Enable it when the category field are placed in form
    if (!itemName || !location || !category || !description || !type) {
      if (imagePath) {
        fs.unlinkSync(imagePath); // Use sync for quick deletion before response
      }
      return res
        .status(400)
        .json({ message: "Missing required item details." });
    }

    //   try {
    const item = new itemModel({
      itemName,
      location,
      category: category || "Other",
      description,
      type: type || "lost", // Assuming a default type if not provided
      postedBy: req.user ? req.user._id : null,
      img: filename ? `/images/${filename}` : null, // 3. Store the file path in MongoDB
    });

    const savedItem = await item.save();

    // to ensure the items of particular user
    const user = await userModel.findById(req.user._id);
    user.uploads.push(savedItem._id);
    await user.save();
    try {
      res.status(201).json({
        message: "Item and image uploaded successfully!",
        item: savedItem,
      });
    } catch (error) {
      console.error("Database Error:", error);
      // 🚨 Critical: If the database save fails, you should delete the file from the disk
      if (imagePath) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Failed to delete file after DB error:", err);
        });
      }
      res.status(500).json({
        message: "Failed to create item due to server error.",
        error: error.message,
      });
    }
  }
);

router.get("/lostItems", async function (req, res) {
  const items = await itemModel.find({ type: "lost" }).populate("postedBy");
  res.status(200).json(items);
});

router.get("/foundItems", async function (req, res) {
  const items = await itemModel.find({ type: "found" }).populate("postedBy");
  res.status(200).json(items);
});

router.get("/userItems", async function (req, res) {
  const items = await itemModel
    .find({ postedBy: req.user._id })
    .populate("postedBy");
  res.status(200).json(items);
});

router.get("/userLostItems", async function (req, res) {
  const items = await itemModel
    .find({ postedBy: req.user._id, type: "lost" })
    .populate("postedBy");
  res.status(200).json(items);
});

router.get("/userFoundItems", async function (req, res) {
  const items = await itemModel
    .find({ postedBy: req.user._id, type: "found" })
    .populate("postedBy");
  res.status(200).json(items);
});

router.get("/adminAllItems", async function (req, res) {
  // 🚨 FIX 1: The function MUST be 'async' to use 'await' 🚨
  try {
    // Find all documents in the itemModel (the empty object {} matches everything)
    const items = await itemModel.find({});

    // 🚨 FIX 2: Send the response back to the client 🚨
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching all items for admin:", error);
    res.status(500).json({ message: "Failed to fetch all items." });
  }
});

module.exports = router;
