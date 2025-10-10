const app = require("./src/app");
const path = require("path");
const express = require("express");
const connectDB = require("./db/db");
const expressSession = require("express-session");
const passport = require("passport");
const userModel = require("./models/user");
var cors = require("cors");

const userRouter = require("./routes/authentication");
const itemRouter = require("./routes/itemRouter");
const notificationRouter = require('./routes/notificationRouter');

connectDB();

app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "hello",
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use("/auth", userRouter); // For any request that starts with "/auth", use the userRouter to handle it. (eg. http://localhost:3000/auth/register)
app.use('/item', itemRouter)
app.use('/notification', notificationRouter);

app.listen(3000, () => {
  console.log("Server runs on port: 3000");
});
