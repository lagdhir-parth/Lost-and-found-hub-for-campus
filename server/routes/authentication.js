const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const itemModel = require('../models/item')
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(userModel.authenticate()));

// router.post("/register", (req, res) => {
//   const { username, name, email, m_no } = req.body;
//   let userData = new userModel({
//     username,
//     name,
//     email,
//     m_no,
//   });

//   userModel
//     .register(userData, req.body.password)
//     .then(function (registeredUser) {
//       passport.authenticate("local")(req, res, function () {
//         res.status(201).json({ message: "Registration successful" });
//       });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "Registration failed" });
//     });
// });

router.post("/register", async (req, res) => {
  try {
    const { username, name, email, m_no, password } = req.body;

    let userData = new userModel({ username, name, email, m_no });
    await userData.validate(); // run schema validations

    userModel.register(userData, password, (err, registeredUser) => {
      if (err) {
        // Return actual error instead of generic
        return res.status(400).json({ message: err.message });
      }

      passport.authenticate("local")(req, res, () => {
        res.status(201).json({ message: "Registration successful" });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message || "Validation failed" });
  }
});

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/profile",
//     failureRedirect: "/",
//   }),
//   function (req, res) {}
// );

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(400)
        .json({ message: info.message || "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          m_no: user.m_no,
        },
      });
    });
  })(req, res, next);
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // res.redirect("/");
    res.status(200).json({ message: "logout successful!!" });
  });
});

router.get("/profile", isLoggedIn, function (req, res) {
  // console.log(req.user)
  res.status(200).json({ message: "User Authenticated" });
});

//used in profile route
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(400).json({ message: "User isn't authenticated" });
}

router.get("/check-auth", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ isLoggedIn: true, user: req.user });
  }
  res.json({ isLoggedIn: false, user: undefined });
});

router.get("/adminAllUsers", async (req, res) => {
  // ⚠️ RECOMMENDATION: Ensure this route is protected by an 'isAdmin' middleware
  // to prevent unauthorized access to all user data.

  try {
    // Find all documents in the userModel
    const users = await userModel.find({});

    // Respond with the array of users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users for admin:", error);
    res.status(500).json({ message: "Failed to fetch user list." });
  }
});

// router.delete('/deleteUser/:userId', ...)

router.delete("/deleteUser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Find and delete the user
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // 🚨 CRITICAL ADDITION: Delete all items posted by this user 🚨
    // Assuming your items schema links back to the user via the 'postedBy' field
    const deleteResult = await itemModel.deleteMany({ postedBy: userId });

    console.log(
      `Deleted user ${userId}. Also deleted ${deleteResult.deletedCount} associated items.`
    );

    res
      .status(200)
      .json({
        success: true,
        message: "User and associated items deleted successfully.",
      });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during deletion." });
  }
});

module.exports = router;
