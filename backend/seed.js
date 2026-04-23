const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Hangout = require('./models/Hangout');

dotenv.config();

const users = [
  { fullName: 'Alice Johnson', username: 'alicej', email: 'alice@test.com', city: 'New York', interests: ['Coding', 'Coffee'], age: 25 },
  { fullName: 'Bob Smith', username: 'bobsmith', email: 'bob@test.com', city: 'San Francisco', interests: ['Hiking', 'Photography'], age: 28 },
  { fullName: 'Charlie Davis', username: 'charlied', email: 'charlie@test.com', city: 'Austin', interests: ['Music', 'Gaming'], age: 22 },
  { fullName: 'Diana Prince', username: 'dianap', email: 'diana@test.com', city: 'Chicago', interests: ['Art', 'Museums'], age: 26 },
  { fullName: 'Ethan Hunt', username: 'ethanh', email: 'ethan@test.com', city: 'Seattle', interests: ['Tech', 'Running'], age: 30 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB');

    await User.deleteMany({});
    await Hangout.deleteMany({});
    
    console.log('Cleared existing data');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const createdUsers = [];
    for (let u of users) {
      const user = new User({ ...u, password });
      await user.save();
      createdUsers.push(user);
    }
    
    console.log('Created 5 seed users');

    const hangouts = [
      { title: 'Weekend Coffee Chat', description: 'Let us meet for coffee and chat about tech.', category: 'Networking', location: 'Downtown Cafe', dateTime: new Date(Date.now() + 86400000), seatLimit: 5, creator: createdUsers[0]._id, participants: [createdUsers[0]._id, createdUsers[1]._id] },
      { title: 'Morning Hike', description: 'Early morning hike at the local trail.', category: 'Fitness', location: 'Muir Woods', dateTime: new Date(Date.now() + 172800000), seatLimit: 10, creator: createdUsers[1]._id, participants: [createdUsers[1]._id, createdUsers[3]._id] }
    ];

    await Hangout.insertMany(hangouts);
    console.log('Created 2 seed hangouts');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
