const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
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
  console.log(req.user)
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
  res.json({ isLoggedIn: false, user:undefined });
});

module.exports = router;
