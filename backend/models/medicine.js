const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  Drug_Name: {
    type: String,
    required: true,
    unique: true
  },
  Category: {
    type: String,
  },
  Description: {
    type: String,
  },
  // Add additional fields as needed based on your data
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Medicine', MedicineSchema);
