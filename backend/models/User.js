const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  city: { type: String },
  profilePicture: { type: String, default: 'https://via.placeholder.com/150' },
  coverImage: { type: String, default: 'https://via.placeholder.com/800x200' },
  bio: { type: String },
  interests: [{ type: String }],
  languages: [{ type: String }],
  availability: [{ type: String }], // e.g., 'Weekends', 'Evenings'
  favoriteActivities: [{ type: String }],
  socialGoals: [{ type: String }],
  isVerified: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
