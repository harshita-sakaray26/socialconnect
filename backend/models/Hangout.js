const mongoose = require('mongoose');

const hangoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  location: { type: String, required: true },
  dateTime: { type: Date, required: true },
  seatLimit: { type: Number, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hangout', hangoutSchema);
