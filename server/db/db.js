const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/lost_and_found")
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("MongoDB error: ", err );
    });
}

module.exports = connectDB
