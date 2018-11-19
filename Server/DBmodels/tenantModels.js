const mongoose = require("mongoose");

const tenantModel = mongoose.model("tenant", {
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  financialDebt: {
    type: String,
  }
});

module.exports = tenantModel;