const mongoose = require("mongoose");

// Define a schema for the insurance form data
const insuranceSchema = new mongoose.Schema({
  insuranceName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  // userEmail: {
  //   type: String,
  //   required: true
  // },
//   submissionDate: {
//     type: Date,
//     default: Date.now
//   }
});

// Create a model based on the schema
const Insurance = mongoose.model("Insurance", insuranceSchema);

module.exports = Insurance;
