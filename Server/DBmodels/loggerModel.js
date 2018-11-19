const mongoose = require("mongoose");

const loggerModel = mongoose.model("logger", {
  event: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  }
});

module.exports = loggerModel;