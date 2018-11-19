const mongoose = require("mongoose");

const userModel = mongoose.model("user", {
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: String
});

module.exports = userModel;