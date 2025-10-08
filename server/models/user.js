const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/lost_and_found");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  m_no: {
    type: String,
    validate: {
      validator: function (v) {
        if(!v) return true;
        return /^[0-9]{10}$/.test(v); // exactly 10 digits
      },
      message: (props) =>
        `${props.value} is not a valid 10-digit mobile number!`,
    },
  },
  uploads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'items'
  }],
});

userSchema.plugin(plm);

module.exports = mongoose.model("users", userSchema);
